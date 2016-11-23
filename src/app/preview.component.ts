import { Component, OnInit, Input } from '@angular/core';
import { EnvProperty } from './interfaces/EnvProperty'

@Component({
    selector: 'preview-deployment-guide',
    template: `{{content}}`
})
export class PreviewComponent implements OnInit {
    @Input()
    envProps: EnvProperty[];
    envPropsObj = {};
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
        this.envPropsObj = this.groupBy(this.envProps, 'env');
        for (let key in this.envPropsObj) {
            this.envPropsObj[key] = this.groupBy(this.envPropsObj[key], 'action')
        }
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
            `
1) Modify File /Build/lib/Environment.properties: 
${this.getEnvPropsString('QAT')}${this.getEnvPropsString('UAT')}${this.getEnvPropsString('PRD')}
2) Modify File /Build/lib/Extended.targets: 
${this.getExtendTarget('QAT')}${this.getExtendTarget('UAT')}${this.getExtendTarget('PRD')}
`
    }

    private getEnvPropsString(environment) {
        let result = '';
        let targetEnvProps = this.envPropsObj[environment];
        if (targetEnvProps) {
            result += `For ${environment}:\r\n`;
            for (let action in targetEnvProps) {
                result += `${action}:\r\n`;
                targetEnvProps[action].forEach(({key, value, condition}: EnvProperty) => {
                    result += condition? 
                    `   <${key} Condition="'$(BU)'=='${condition}'">${value ? value : ''}</${key}>\r\n` : 
                    `   <${key}>${value ? value : ''}</${key}>\r\n`
                })
            }
            result += '\r\n';
        }
        return result;
    }

    private getExtendTarget(environment) {
        let result = '';
        let targetEnvProps = Object.assign({}, this.envPropsObj[environment]);
        if (targetEnvProps) {
            delete targetEnvProps['Edit'];
        }
        if (Object.keys(targetEnvProps).length !== 0) {
            result += `For ${environment}:\r\n`;
            for (let action in targetEnvProps) {
                result += `${action}:\r\n`;
                targetEnvProps[action].forEach(({key}: EnvProperty) => { result += `   <FileUpdate Regex="\\$\\(${key}\\)" ReplacementText="$(${key})" Files="@(ConfigFile)" Multiline="true" IgnoreCase="true"/>\r\n` })
            }
            result += '\r\n';
        }
        return result;
    }
}