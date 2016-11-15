import { Component, OnInit } from '@angular/core';
import { EnvProperty } from './interfaces/EnvProperty';
import { EnvPropService } from './envProp.service';
import { ToasterService } from 'angular2-toaster';
import * as moment from 'moment';

@Component({
  selector: 'env-edit',
  providers: [EnvPropService, ToasterService],
  templateUrl: 'envEdit.html'
})

export class EnvEditComponent implements OnInit {
  envProp: EnvProperty;
  envProps: Array<EnvProperty>;
  filteredEnvProps: Array<EnvProperty>;
  dateRange = { from: moment().subtract(7, 'days').format("YYYY-MM-DD"), to: moment().format("YYYY-MM-DD") };

  constructor(private envPropService: EnvPropService, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.envPropService.getEnvProps().then(envProps => {
      this.envProps = envProps;
      this.filterEnvProps();
    });
  }

  filterEnvProps() {
    this.filteredEnvProps = this.envProps.filter(({date}) => {
      return moment(this.dateRange.from).isSameOrBefore(date) && moment(this.dateRange.to).isSameOrAfter(date);
    })
  }

  revertEnvProp(envProp) {
    let preValue = envProp.original;
    let isNewEnv = typeof preValue === 'undefined';
    if (isNewEnv) {
      let index = this.envProps.indexOf(envProp);
      this.envProps.splice(index, 1);
      this.filterEnvProps();
    } else {
      envProp.action = preValue.action;
      envProp.date = preValue.date;
      envProp.env = preValue.env;
      envProp.key = preValue.key;
      envProp.value = preValue.value;
    }
  }

  copyEnvProp(envProp): void {
    let copyEnvProp: EnvProperty = this.copyObject(envProp);
    copyEnvProp.isEditing = true;
    this.envProps.push(copyEnvProp);
    this.filterEnvProps();
  }

  copyObject(object) {
    return Object.assign({}, object);
  }

  deleteEnvProp(envProp): void {
    let index = this.envProps.indexOf(envProp);
    this.envProps.splice(index, 1);
    this.filterEnvProps();
    this.updateEnvProps();
  }

  addNewEnvProp() {
    this.envProps.push({ env: 'QAT', action: 'Add', isEditing: true, date: this.dateRange.to });
    this.filterEnvProps();
  }

  updateEnvProps() {
    let data = this.envProps.map(({date, env, key, value, action}) => { return { date, env, key, value, action } });
    this.envPropService.saveEnvProps(data).then(
      (isSuccess) => this.toasterService.pop('info', 'Upadate success!')
    );
  }

  downloadDeploymentGuide() {
    this.download("Deployment_Guide.txt", $('preview-deployment-guide').text());
  }

  private download(filename, text) {
    var anchor = document.createElement('a');
    anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    anchor.setAttribute('download', filename);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      anchor.dispatchEvent(event);
    }
    else {
      anchor.click();
    }
  }
}