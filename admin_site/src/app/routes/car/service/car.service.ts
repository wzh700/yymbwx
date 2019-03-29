import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Car } from '../../car/domain/car.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions,getDownloadTokenOptions } from '../../passport/login/login.service';

@Injectable() 
export class CarService {

    constructor(private http: Http) {}
    
    url = baseUrl+"cars"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    add(v): Promise<any>{ 
        let param = { car: v} 
        return this.http.post(this.url, param, getTokenOptions(null))
                   .map(response => response.json()).toPromise();
    }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
                   .map(response => response.json())
                   .toPromise();
    }

    isUpdate = false;
    formOperation = 'create';
    car : Car = null;

    initUpdate(id){
        return this.http.get(this.url + `/${id}`, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }

    update(cid, v): Promise<any>{
        let param = { car: v} 
        return this.http.put(this.url + `/${cid}`,param, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }
    
}