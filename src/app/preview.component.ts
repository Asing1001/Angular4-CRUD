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
    envPropsGroupedByEnv = {};
    previousEnvProps: EnvProperty[];
    content = '';
    constructor() { }

    ngOnInit() {

    }

    ngDoCheck() {
        if (!this.envProps || JSON.stringify(this.previousEnvProps) === JSON.stringify(this.envProps)) {
            return;
        }

        //deep copy envProps array for next compare
        this.previousEnvProps = $.extend(true, [], this.envProps);
        this.groupEnvProps();
        this.generateContent();
    }

    private groupEnvProps() {
        this.envPropsGroupedByEnv = this.groupBy(this.envProps, 'env');
        for (let key in this.envPropsGroupedByEnv) {
            const singleEnvProps = this.getFinalStatus(this.envPropsGroupedByEnv[key]);
            this.envPropsGroupedByEnv[key] = this.groupBy(singleEnvProps, 'action')
        }
    }

    private getFinalStatus(envArray: EnvProperty[]) {
        let result: EnvProperty[] = [];
        envArray.forEach((envProp: EnvProperty) => {
            const matchedEnvProp = result.find(({ key }) => key === envProp.key);
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
        let targetEnvProps = this.envPropsGroupedByEnv[environment];
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

    getCondictionString(conditions: KeyValPair[]) {
        if(!conditions || conditions.length===0){
            return '';
        }
        const conditionString = conditions.map(({key,value})=>`'$(${key})'=='${value}'`).join(' AND ');
        return ` Condition="${conditionString}"`
    }

    private getDistinctExtendTarget() {
        let result = '';
        const envPropsWithoutEdit = this.envProps.filter(({ action }) => action !== 'Edit');
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