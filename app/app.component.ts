import { Component,OnInit} from '@angular/core';
import {EnvProperty} from './interfaces/EnvProperty';
import {EnvPropService} from './envProp.service';

@Component({
  selector: 'my-app',
  providers : [EnvPropService],
  templateUrl: 'public/templates/envEdit.html'
})

export class AppComponent implements OnInit{
  title = 'Deployment Guide';
  envProp: EnvProperty;
  envProps: Array<EnvProperty>;

  constructor(private envPropService: EnvPropService) {    
  }

  ngOnInit(){
    this.envPropService.getEnvProps().then(envProps=>this.envProps = envProps);
  }

  copyEnvProp(envProp): void {
    let copyEnvProp = Object.assign({}, envProp)
    this.envProps.push(copyEnvProp);
  }

  deleteEnvProp(index): void {
    this.envProps.splice(index, 1);
  }

  addNewEnvProp() {
    this.envProps.push({ env: 'QAT', action: 'Add', isEditing: true });
  }

  saveEnvProp(envProp){

  }
}