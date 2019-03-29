import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { CarRoutingModule } from './car-routing.module';

import { CarComponent } from './car.component';
import { CarListComponent } from './list/list.component';
import { CarFormComponent } from './form/form.component';
import { CarService } from '../car/service/car.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, CarRoutingModule, MainPipe ],
  declarations: [
    CarComponent,
    CarListComponent,
    CarFormComponent
  ],
  providers: [
    CarService
  ]
})
export class CarModule { }

