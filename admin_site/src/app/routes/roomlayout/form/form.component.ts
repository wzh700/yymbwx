import {Component,OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

import { RoomLayoutService } from '../service/roomlayout.service';
import { RoomLayout } from '../domain/roomlayout.domain'; 

@Component({
    selector: 'roomlayout-form',
    templateUrl: './form.component.html'
})
export class RoomLayoutFormComponent implements OnInit {
    
    form: FormGroup;
    roomlayout: RoomLayout;
    card_title = "";

    file: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private srv: RoomLayoutService,
        private msg: NzMessageService
        ) 
    {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.srv.formOperation == 'create') {this.initCreate();}
        if (this.srv.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
            layout : [this.roomlayout? this.roomlayout.layout : null, Validators.required ],
            price_01 : [this.roomlayout? this.roomlayout.price_01 : null, Validators.required],
            price_02 : [this.roomlayout? this.roomlayout.price_02 : null],
            breakfast : [this.roomlayout? this.roomlayout.breakfast : false, Validators.required],
            book_price : [this.roomlayout? this.roomlayout.book_price : null, Validators.required],
            desc: [this.roomlayout? this.roomlayout.book_price : null]
        });
    }

    setTitle() {
        if (this.srv.formOperation == "create") { 
            this.card_title = "创建房型信息";
        }
        if (this.srv.formOperation == "update") { 
            this.card_title = "修改房型信息";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        let op = this.srv.formOperation;
        if (op == 'create') this.srv.add_with_file(this.form.value, this.file).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('房型信息 ' + resp.data.layout + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.srv.update(this.roomlayout.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('房型信息 ' + resp.data.layout + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        console.log(this.file)
     this.router.navigateByUrl('/roomlayout/page');
    }

    initUpdate() {
        this.roomlayout = this.srv.roomlayout;
    }

    initCreate() {
        this.srv.roomlayout = null;
    }

    onchange(e){
        this.file = e.target.files[0];
    }


}