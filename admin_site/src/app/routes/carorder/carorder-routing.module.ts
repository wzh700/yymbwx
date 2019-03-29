import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarOrderComponent } from './carorder.component';
import { CarOrderListComponent } from './list/list.component';
import { CarOrderFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: CarOrderComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: CarOrderListComponent },
		{ path: 'form', component: CarOrderFormComponent }
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CarOrderRoutingModule { }












