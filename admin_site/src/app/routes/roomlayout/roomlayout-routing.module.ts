import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomLayoutComponent } from './roomlayout.component';
import { RoomLayoutListComponent } from './list/list.component';
import { RoomLayoutFormComponent } from './form/form.component';

const routes: Routes = [{
    path: '',
	component: RoomLayoutComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: RoomLayoutListComponent },
		{ path: 'form', component: RoomLayoutFormComponent }
	]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoomLayoutRoutingModule { }







