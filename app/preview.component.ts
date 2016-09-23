import { Component, OnInit, Input } from '@angular/core';
import {EnvProperty} from './interfaces/EnvProperty'

@Component({
    moduleId: module.id,
    selector: 'preview-deployment-guide',
    template:`
<ul>
    <p *ngFor="let envProp of envProps">
        <{{envProp.key}}>{{envProp.value}}
            <{{envProp.key}}/>
    </p>
</ul>`
})
export class PreviewComponent implements OnInit {
    @Input()
    envProps:EnvProperty;
    
    constructor() { }

    ngOnInit() { }
}