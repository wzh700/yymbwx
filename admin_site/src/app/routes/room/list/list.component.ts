import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { RoomService } from '../service/room.service';

@Component({
    selector: 'room-list',
    templateUrl: './list.component.html'
})
export class RoomListComponent implements OnInit {

    q: any = {
        page_index: 1,
        page_size: 15,
        sort_field: "layout_id",
        sort_direction: "desc",
        owner_name: null,
    };

    total: number;

    data: any[] = [];

    delObj = null;

    loading = false;

    sortMap: any = {};

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private srv: RoomService,
        private router: Router
        ) {}

    ngOnInit() {
        this.getData();
    }

    _onReuseInit() {
        this.getData();
    }

    getData() {
        this.formatForm()
        this.loading = true;
        this.srv.listOnePage(this.q)
                         .then(resp => {
                             if (resp.error) {
                                this.msg.error(resp.error);
                                this.loading = false;
                             } else {
                                this.data = resp.data;this.total = resp.total_entries; 
                                this.loading = false;
                             }
                         })
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    remove(obj) {
        this.confirmContent = "确定要删除房间信息：" + obj.layout_id + "?";
        this.modalVisible = true;
        this.delObj = obj;
    }

    delete() {
        this.srv.delete(this.delObj.id)
                         .then(resp => this.msg.success("房间信息:" + resp.data.layout_id + "已删除！")).then(resp => this.getData() )
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    add() {
        this.srv.formOperation = 'create';
        this.srv.isUpdate=false;
        this.router.navigateByUrl('/room/form');
    }

    update(id) {
        this.srv.formOperation='update';
        this.srv.initUpdate(id)
            .then(result => { this.srv.room = result.data;})
            .then(() => this.router.navigateByUrl('/room/form')).catch((error)=>
            this.msg.error(error)); 
    }
    
    sort(field: string, value: any) {
        this.q.sort_field = field;
        if (value=="ascend") {this.q.sort_direction = "asc"}
        if (value=="descend") {this.q.sort_direction = "desc"}
        this.getData();
    }

    pageChange(pi: number) {
        this.q.page_index = pi;
        this.getData();
    }

    formatForm() {
        if ((this.q.layout_id == null)||(this.q.layout_id == "")){delete this.q.layout_id}

    }

    reset() {
        this.q = {
            page_index: 1,
            page_size: 15,
            sort_field: "layout_id",
            sort_direction: "desc",
            owner_name: null,
        };
        this.getData()
    }

    // 删除确认框相关
    confirmContent = ""
    modalVisible = false;

    showModal = () => {
        this.modalVisible = true;
    }

    handleOk = (e) => {
        this.modalVisible = false;
        this.delete();
    }

    handleCancel = (e) => {
        this.modalVisible = false;
    }
}