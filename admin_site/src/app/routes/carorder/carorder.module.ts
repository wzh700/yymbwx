import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { CarOrderRoutingModule } from './carorder-routing.module';

import { CarOrderComponent } from './carorder.component';
import { CarOrderListComponent } from './list/list.component';
import { CarOrderFormComponent } from './form/form.component';
import { CarOrderService } from './service/carorder.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, CarOrderRoutingModule, MainPipe ],
  declarations: [
    CarOrderComponent,
    CarOrderListComponent,
    CarOrderFormComponent
  ],
  providers: [
    CarOrderService
  ]
})
export class CarOrderModule { }

