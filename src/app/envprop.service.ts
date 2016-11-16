import { Injectable } from '@angular/core';
import {EnvProperty} from './interfaces/EnvProperty';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EnvPropService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private envPropsApiUrl = 'api/envProps';
    constructor(private http: Http) { }
    getEnvProps(projectName): Promise<EnvProperty[]> {
        return this.http.get(this.envPropsApiUrl+'?projectName='+projectName)
            .toPromise()
            .then(response => { return response.json()})
    }

    saveEnvProps(data): Promise<any> {
        return this.http.post(this.envPropsApiUrl,data)
            .toPromise()
            .then(response => response.json())
    }
}