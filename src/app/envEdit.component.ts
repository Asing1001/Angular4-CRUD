import { Component, OnInit } from '@angular/core';
import { EnvProperty } from './interfaces/EnvProperty';
import { ToasterService } from 'angular2-toaster';
import * as moment from 'moment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'env-edit',
  providers: [ToasterService],
  templateUrl: 'envEdit.html'
})

export class EnvEditComponent implements OnInit {
  projectName: string = '';
  envProp: EnvProperty;
  envProps: Array<EnvProperty>;
  dateRange = { from: moment().subtract(5, 'days').format("YYYY-MM-DD"), to: moment().add(1, 'days').format("YYYY-MM-DD") };

  constructor(private route: ActivatedRoute, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectName = params['project'];
      this.getEnvProps();
    });
  }

  async getEnvProps() {
    const envProps = await dpd.envprops.get({ projectName: this.projectName, date: { '$gte': this.dateRange.from, '$lte': this.dateRange.to } });
    this.envProps = envProps.sort(({ date: dateA }, { date: dateB }) => {
      return moment(dateB).diff(moment(dateA))
    })
  }


  revertEnvProp(envProp) {
    let preValue = envProp.original;
    let isNewEnv = typeof preValue === 'undefined';
    if (isNewEnv) {
      let index = this.envProps.indexOf(envProp);
      this.envProps.splice(index, 1);
    } else {
      envProp.action = preValue.action;
      envProp.date = preValue.date;
      envProp.env = preValue.env;
      envProp.key = preValue.key;
      envProp.value = preValue.value;
      envProp.conditions = preValue.conditions;
      delete envProp.original;
    }
  }

  getEnvPropParserError({ key, value }: EnvProperty) {
    var parser = new DOMParser();
    var result = parser.parseFromString(`<${key}>${value}</${key}>`, 'text/xml');
    return result.querySelector('parsererror');
  }

  saveEnvProps(envProp: EnvProperty) {
    var paserError = this.getEnvPropParserError(envProp)
    if (paserError) {
      this.toasterService.pop('error', "Your input has xml parsing error, please check again")
      return
    }

    if(/&amp;(?!amp;)/.test(envProp.value) && !confirm('Your input contains "&amp;" Please confirm you only need one "amp;"')){
      return;
    }

    dpd.envprops.post(envProp).then(({ id }: EnvProperty) => {
      envProp.id = id;
      envProp.isEditing = false;
      this.toasterService.pop('info', 'Upadate successfully !');
    }).fail(error => {
      this.toasterService.pop('error', JSON.stringify(error))
      console.error('saveEnvProps got error:', error);
    });
  }

  copyEnvProp(envProp, index): void {
    let copyEnvProp: EnvProperty = this.copyObject(envProp);
    copyEnvProp.isEditing = true;
    delete copyEnvProp.id;
    this.envProps.splice(index + 1, 0, copyEnvProp);
  }

  copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  deleteEnvProp(envProp: EnvProperty): void {
    if (!confirm("Confirm delete ?")) {
      return
    }
    dpd.envprops.del({ id: envProp.id }).then(msg => {
      this.toasterService.pop('info', 'Delete successfully !');
      const index = this.envProps.indexOf(envProp);
      this.envProps.splice(index, 1);
    }).fail(error => {
      this.toasterService.pop('error', JSON.stringify(error))
      console.error('deleteEnvProp got error:', error);
    });
  }

  addNewEnvProp() {
    this.envProps.unshift({ env: 'QAT', action: 'Add', isEditing: true, date: this.dateRange.to, conditions: [], projectName: this.projectName });
  }

  addCondition(envProp: EnvProperty) {
    const defaultCondition = { key: '', value: '' };
    if (envProp.conditions) {
      envProp.conditions.push(defaultCondition);
    } else {
      envProp.conditions = [defaultCondition];
    }
  }

  downloadDeploymentGuide() {
    this.download(`${this.projectName}-${moment().format('YYYY-MM-DD')}-deploymentGuide`, $('preview-deployment-guide').text());
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