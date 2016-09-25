import { Component, OnInit } from '@angular/core';
import { EnvProperty } from './interfaces/EnvProperty';
import { EnvPropService } from './envProp.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'my-app',
  providers: [EnvPropService, ToasterService],
  templateUrl: 'public/templates/envEdit.html'
})

export class AppComponent implements OnInit {
  title = 'Deployment Guide';
  envProp: EnvProperty;
  envProps: Array<EnvProperty>;

  constructor(private envPropService: EnvPropService, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.envPropService.getEnvProps().then(envProps => this.envProps = envProps);
  }

  copyEnvProp(envProp): void {
    let copyEnvProp: EnvProperty = Object.assign({}, envProp);
    copyEnvProp.isEditing = true;
    this.envProps.push(copyEnvProp);
  }

  deleteEnvProp(index): void {
    this.envProps.splice(index, 1);
    this.saveEnvProps();
  }

  addNewEnvProp() {
    this.envProps.push({ env: 'QAT', action: 'Add', isEditing: true });
  }

  saveEnvProps() {
    let data = this.envProps.map(({env,key,value,action})=>{return {env,key,value,action}}); 
    this.envPropService.saveEnvProps(data).then(
      (isSuccess) => this.toasterService.pop('success', 'Upadate success!')
    );
  }
}