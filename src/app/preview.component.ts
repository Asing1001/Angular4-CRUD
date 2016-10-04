import { Component, OnInit, Input } from '@angular/core';
import { EnvProperty } from './interfaces/EnvProperty'

@Component({
    selector: 'preview-deployment-guide',
    template: `
<ul>
    <p *ngFor="let envProp of qatEnvProps">
        <{{envProp.key}}>{{envProp.value}}
            <{{envProp.key}}/>
    </p>
    <p *ngFor="let envProp of uatEnvProps">
        <{{envProp.key}}>{{envProp.value}}
            <{{envProp.key}}/>
    </p>
    <p *ngFor="let envProp of prodEnvProps">
        <{{envProp.key}}>{{envProp.value}}
            <{{envProp.key}}/>
    </p>
</ul>`
})
export class PreviewComponent implements OnInit {
    @Input()
    envProps: EnvProperty[];
    qatEnvProps = [];
    uatEnvProps = [];
    prodEnvProps = [];

    constructor() { }

    ngOnInit() {
        
    }

    ngOnChanges(){
        if(!this.envProps){
            return;
        }
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
}