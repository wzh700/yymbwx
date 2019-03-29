import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

import { CarService } from '../service/car.service';
import { Car } from '../domain/car.domain'; 

@Component({
    selector: 'car-form',
    templateUrl: './form.component.html'
})
export class CarFormComponent implements OnInit {

    form: FormGroup;
    car: Car;
    card_title = "";
 
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private srv: CarService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.srv.formOperation == 'create') {this.initCreate();}
        if (this.srv.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
            buydate : [this.car? this.car.buydate : null, Validators.required ],
//            kind : [this.car? this.car.kind : null, Validators.required],
            no : [this.car? this.car.no : null],
//            orderdate : [this.car? this.car.orderdate : false, Validators.required],
//            pic : [this.car? this.car.pic : null, Validators.required],
//            price : [this.car? this.car.price : null, Validators.required],
//            state : [this.car? this.car.state : null, Validators.required],
//            usedate : [this.car? this.car.usedate : null, Validators.required],
//            desc: [this.car? this.car.state : null]
        });
    }

    setTitle() {
        if (this.srv.formOperation == "create") { 
            this.card_title = "创建车辆信息";
        }
        if (this.srv.formOperation == "update") { 
            this.card_title = "修改车辆信息";
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
                this.msg.success('车辆信息 ' + resp.data.no + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.srv.update(this.car.id, this.form.value).then(resp => {
            console.log("update!!!!")
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('车辆信息 ' + resp.data.no + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/car/page');
    }

    initUpdate() {
        this.car = this.srv.car;
    }

    initCreate() {
        this.srv.car = null;
    }

}