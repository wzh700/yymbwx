import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { RoomOrder } from '../../roomorder/domain/roomorder.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions,getDownloadTokenOptions } from '../../passport/login/login.service';

@Injectable() 
export class RoomOrderService {
 
    constructor(private http: Http) {}
    
    url = baseUrl+"room_order_info"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    add(v): Promise<any>{ 
        v.user = {open_id: v.user_id.toString()};      
        v.room_layout = {id: v.layout_id};
        let param = { room_order_info: v};
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
    room_order_info : RoomOrder = null;

    initUpdate(id){
        return this.http.get(this.url + `/${id}`, getTokenOptions(null))
                .map(response => response.json()).toPromise();
                
    }
 
    update(cid, v): Promise<any>{
        v.user = {open_id: v.user_id.toString()};      
        v.room_layout = {id: v.layout_id};
        let param = { room_order_info: v} 
        return this.http.put(this.url + `/${cid}`,param, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }
    
}