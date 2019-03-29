import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarComponent } from './car.component';
import { CarListComponent } from './list/list.component';
import { CarFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: CarComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: CarListComponent },
		{ path: 'form', component: CarFormComponent }
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CarRoutingModule { }












