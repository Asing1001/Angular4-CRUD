import { Component, OnInit, Input } from '@angular/core';
import { EnvProperty, KeyValPair } from './interfaces/EnvProperty'
import * as moment from 'moment';

@Component({
    selector: 'preview-deployment-guide',
    template: `{{content}}`
})
export class PreviewComponent implements OnInit {
    @Input()
    envProps: EnvProperty[];
    copyEnvProps: EnvProperty[];
    content = '';
    constructor() { }

    ngOnInit() {

    }

    ngDoCheck() {
        if (!this.envProps || JSON.stringify(this.copyEnvProps) === JSON.stringify(this.envProps)) {
            return;
        }

        //deep copy envProps array for next compare
        this.copyEnvProps = JSON.parse(JSON.stringify(this.envProps));
        this.generateContent();
    }

    private getFinalStatus(envArray: EnvProperty[]) {
        let result: EnvProperty[] = [];
        envArray.forEach((envProp: EnvProperty) => {
            const matchedEnvProp = result.find(({ key, conditions }) => key === envProp.key && JSON.stringify(conditions) === JSON.stringify(envProp.conditions));
            if (matchedEnvProp) {
                if (matchedEnvProp.action === 'Edit' && envProp.action === 'Add')
                    matchedEnvProp.action = 'Add';
            } else {
                result.push(envProp);
            }
        });
        return result;
    }

    private groupBy(array: Array<any>, key) {
        let result = {};
        array.forEach(obj => {
            let resultKey = obj[key];
            if (!result[resultKey]) {
                result[resultKey] = [];
            }

            result[resultKey].push(obj);
        })
        return result;
    }

    private generateContent() {
        this.content =
            `1) Modify File /Build/lib/Environment.properties:\r\n${this.getEnvPropsString('QAT')}${this.getEnvPropsString('UAT')}${this.getEnvPropsString('PRD')}`
            +
            `2) Modify File /Build/lib/Extended.targets:\r\n${this.getDistinctExtendTarget()}`
    }

    private getEnvPropsString(environment) {
        let result = '';
        let envPropsGroupedByEnv = this.getGroupedEnvProps();
        let targetEnvProps = envPropsGroupedByEnv[environment];
        if (targetEnvProps) {
            result += `For ${environment}:\r\n`;
            for (let action in targetEnvProps) {
                result += `${action}:\r\n`;
                targetEnvProps[action].forEach(({ key, value, conditions }: EnvProperty) => {
                    result += `   <${key}${this.getCondictionString(conditions)}>${value ? value : ''}</${key}>\r\n`
                })
            }
            result += '\r\n';
        }
        return result;
    }

    private getGroupedEnvProps() {
        let envPropsGroupedByEnv = this.groupBy(this.copyEnvProps, 'env');
        for (let key in envPropsGroupedByEnv) {
            const singleEnvProps = this.getFinalStatus(envPropsGroupedByEnv[key]);
            envPropsGroupedByEnv[key] = this.groupBy(singleEnvProps, 'action')
        }
        return envPropsGroupedByEnv;
    }

    getCondictionString(conditions: KeyValPair[]) {
        if (!conditions || conditions.length === 0) {
            return '';
        }
        const conditionString = conditions.filter(({ key }) => key).map(({ key, value }) => `'$(${key})'=='${value}'`).join(' AND ');
        return conditionString ? ` Condition="${conditionString}"` : "";
    }

    private getDistinctExtendTarget() {
        let result = '';
        const envPropsWithoutEdit = this.copyEnvProps.filter(({ action }) => action !== 'Edit');
        if (envPropsWithoutEdit.length > 0) {
            const envPropsGroupByActions = this.groupBy(this.getFinalStatus(envPropsWithoutEdit), 'action');
            for (let action in envPropsGroupByActions) {
                result += `${action}:\r\n`;
                let keysSet = new Set(envPropsGroupByActions[action].map(({ key }) => key));
                keysSet.forEach((key) => { result += `   <FileUpdate Regex="\\$\\(${key}\\)" ReplacementText="$(${key})" Files="@(ConfigFile)" Multiline="true" IgnoreCase="true"/>\r\n` })
            }
        }
        return result;
    }
}