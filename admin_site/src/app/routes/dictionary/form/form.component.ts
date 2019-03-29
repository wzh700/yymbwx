import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

import { DictService } from '../service/dict.service';
import { Dict } from '../domain/dict.domain'; 

@Component({
    selector: 'dict-form',
    templateUrl: './form.component.html'
})
export class DictFormComponent implements OnInit {

    form: FormGroup;
    dict: Dict;
    card_title = "";
    
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private srv: DictService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.srv.formOperation == 'create') {this.initCreate();}
        if (this.srv.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
          type : [this.dict? this.dict.type : null, Validators.required ],
          key : [this.dict? this.dict.key : null, Validators.required],
          value : [this.dict? this.dict.value : null, Validators.required],
        });
    }

    setTitle() {
        if (this.srv.formOperation == "create") { 
            this.card_title = "创建数据字典";
        }
        if (this.srv.formOperation == "update") { 
            this.card_title = "修改数据字典";
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
                this.msg.success('数据字典已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.srv.update(this.dict.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('数据字典已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/dict/page');
    }

    initUpdate() {
        this.dict = this.srv.dict;
    }

    initCreate() {
        this.srv.dict = null;
    }

}