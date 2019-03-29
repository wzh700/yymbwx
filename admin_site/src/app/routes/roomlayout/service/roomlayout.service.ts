import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { RoomLayout } from '../../roomlayout/domain/roomlayout.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions,getDownloadTokenOptions } from '../../passport/login/login.service';

@Injectable()
export class RoomLayoutService {

    constructor(private http: Http) {}
    
    url = baseUrl+"room_layouts"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    add(v): Promise<any>{ 
        let param = { room_layout: v} 
        return this.http.post(this.url, param, getTokenOptions(null))
                   .map(response => response.json()).toPromise();
    }

    add_with_file(v, file): Promise<any>{ 
        const formData = new FormData();
        formData.append("layout_pic", file);
        return this.http.post(this.url + 
            `?layout=${v.layout}&price_01=${v.price_01}&book_price=${v.book_price}&breakfast=${v.breakfast}`, formData)
            .map(response => response.json()).toPromise();
    }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, getTokenOptions(null))
                   .map(response => response.json())
                   .toPromise();
    }

    isUpdate = false;
    formOperation = 'create';
    roomlayout : RoomLayout = null;

    initUpdate(id){
        return this.http.get(this.url + `/${id}`, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }

    update(cid, v): Promise<any>{
        let param = { room_layout: v} 
        return this.http.put(this.url + `/${cid}`,param, getTokenOptions(null))
                .map(response => response.json()).toPromise();
    }

    update_with_file(cid, v, file): Promise<any>{
        const formData = new FormData();
        formData.append("layout_pic", file);
        return this.http.put(this.url + `/${cid}` + `?layout=${v.layout}&price_01=${v.price_01}&book_price=${v.book_price}&breakfast=${v.breakfast}`, formData)
                .map(response => response.json()).toPromise();
    }
    
}