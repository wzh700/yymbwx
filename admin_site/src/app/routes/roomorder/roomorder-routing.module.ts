import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomOrderComponent } from './roomorder.component';
import { RoomOrderListComponent } from './list/list.component';
import { RoomOrderFormComponent } from './form/form.component';

const routes: Routes = [{ 
    path: '', 
    component: RoomOrderComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: RoomOrderListComponent },
      { path: 'form', component: RoomOrderFormComponent }
    ],
    
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoomOrderRoutingModule { }