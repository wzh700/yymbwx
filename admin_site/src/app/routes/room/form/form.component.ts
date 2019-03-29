import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

import { RoomService } from '../service/room.service';
import { Room } from '../domain/room.domain'; 

@Component({
    selector: 'room-form',
    templateUrl: './form.component.html'
})
export class RoomFormComponent implements OnInit {

    form: FormGroup;
    room: Room;
    card_title = "";
    
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private srv: RoomService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.srv.formOperation == 'create') {this.initCreate();}
        if (this.srv.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
            layout_id : [this.room? this.room.layout_id : null, Validators.required ],
            room_number : [this.room? this.room.room_number : null, Validators.required],
            desc: [this.room? this.room.desc : null]
        });
    }

    setTitle() {
        if (this.srv.formOperation == "create") { 
            this.card_title = "创建房间信息";
        }
        if (this.srv.formOperation == "update") { 
            this.card_title = "修改房间信息";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        let op = this.srv.formOperation;
        if (op == 'create') this.srv.add(this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('房间信息 ' + resp.data.layout + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.srv.update(this.room.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('房间信息 ' + resp.data.layout + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/room/page');
    }

    initUpdate() {
        this.room = this.srv.room;
    }

    initCreate() {
        this.srv.room = null;
    }

}