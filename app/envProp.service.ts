import { Injectable } from '@angular/core';
import {EnvProperty} from './interfaces/EnvProperty';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EnvPropService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private envPropsApiUrl = 'api/envProps';
    constructor(private http: Http) { }
    getEnvProps(): Promise<EnvProperty[]> {
        return this.http.get(this.envPropsApiUrl)
            .toPromise()
            .then(response => response.json())
        //.catch(this.handleError);
    }

    saveEnvProps(envProps:EnvProperty[]): Promise<any> {
        return this.http.post(this.envPropsApiUrl,envProps)
            .toPromise()
            .then(response => response.json())
        //.catch(this.handleError);
    }  
    
}