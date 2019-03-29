import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictComponent } from './dict.component';
import { DictListComponent } from './list/list.component';
import { DictFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: DictComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: DictListComponent },
		{ path: 'form', component:DictFormComponent }
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DictRoutingModule { }







