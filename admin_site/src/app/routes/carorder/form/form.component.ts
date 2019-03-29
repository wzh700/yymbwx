import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

import { CarOrderService } from '../service/carorder.service';
import { CarOrder } from '../domain/carorder.domain'; 

@Component({
    selector: 'car-form',
    templateUrl: './form.component.html'
})
export class CarOrderFormComponent implements OnInit {

    form: FormGroup;
    car: CarOrder;
    card_title = "";

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private srv: CarOrderService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.srv.formOperation == 'create') {this.initCreate();}
        if (this.srv.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
//            buydate : [this.car? this.car.buydate : null, Validators.required ],
            kind : [this.car? this.car.kind : null, Validators.required],
//            no : [this.car? this.car.carNo : null],
            orderDate : [this.car? this.car.orderDate : false, Validators.required],
//            pic : [this.car? this.car.pic : null, Validators.required],
//            price : [this.car? this.car.price : null, Validators.required],
            state : [this.car? this.car.state : "t", Validators.required],
//            usedate : [this.car? this.car.usedate : null, Validators.required],
//            desc: [this.car? this.car.state : null]
        });
    }

    setTitle() {
        if (this.srv.formOperation == "create") { 
            this.card_title = "创建车辆预订信息";
        }
        if (this.srv.formOperation == "update") { 
            this.card_title = "修改车辆预订信息";
        }
    }

    _submitForm() {
        console.log("insubmit!!!!")
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        let op = this.srv.formOperation;
        if (op == 'create') this.srv.add(this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('车辆预订 ' + resp.data.no + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.srv.update(this.car.id, this.form.value).then(resp => {
            console.log("update!!!!")
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('车辆预订 ' + resp.data.no + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/carorder/page');
    }

    initUpdate() {
        this.car = this.srv.car;
    }

    initCreate() {
        this.srv.car = null;
    }

}