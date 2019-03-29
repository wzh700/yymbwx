import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { DictRoutingModule } from './dict-routing.module';

import { DictComponent } from './dict.component';
import { DictListComponent } from './list/list.component';
import { DictFormComponent } from './form/form.component';
import { DictService } from '../dictionary/service/dict.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, DictRoutingModule, MainPipe ],
  declarations: [
    DictComponent,
    DictListComponent,
    DictFormComponent
  ],
  providers: [
    DictService
  ]
})
export class DictModule { }

