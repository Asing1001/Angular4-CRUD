import { Component, OnInit, Input } from '@angular/core';
import { EnvProperty } from './interfaces/EnvProperty'

@Component({
    selector: 'preview-deployment-guide',
    template: `{{content}}`
})
export class PreviewComponent implements OnInit {
    @Input()
    envProps: EnvProperty[];
    previousEnvProps: EnvProperty[];
    qatEnvProps = [];
    uatEnvProps = [];
    prodEnvProps = [];
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
        [this.qatEnvProps, this.uatEnvProps, this.prodEnvProps] = [[], [], []];
        this.envProps.forEach(envProp => {
            switch (envProp.env) {
                case 'QAT':
                    this.qatEnvProps.push(envProp);
                    break;
                case 'UAT':
                    this.uatEnvProps.push(envProp);
                    break;
                case 'PROD':
                    this.prodEnvProps.push(envProp);
                    break;
            }
        })
    }

    private generateContent() {
        this.content =
            `
1) Modify File: /Build/lib/Environment.properties
${this.getEnvPropsString('QAT', this.qatEnvProps)}
${this.getEnvPropsString('UAT', this.uatEnvProps)}
${this.getEnvPropsString('PROD', this.prodEnvProps)}
2) Modify File /Build/lib/Extended.targets:
${this.getExtendTarget('QAT', this.qatEnvProps)}
${this.getExtendTarget('UAT', this.uatEnvProps)}
${this.getExtendTarget('PROD', this.prodEnvProps)}
`
    }

    private getEnvPropsString(environment, envProps) {
        let result = '';
        if (envProps.length > 0) {
            result += `For ${environment}:\r\n`;
            envProps.forEach(({key, value}: EnvProperty) => { result += `<${key}>${value}</${key}>\r\n` })
        }
        return result;
    }

    private getExtendTarget(environment, envProps) {
        let result = '';
        if (envProps.length > 0) {
            result += `For ${environment}:\r\n`;
            envProps.forEach(({key}: EnvProperty) => { result += `<FileUpdate Regex="\\$\\(${key}\\)" ReplacementText="$(${key})" Files="@(ConfigFile)" Multiline="true" IgnoreCase="true"/>\r\n` })
        }
        return result;
    }
}