import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomComponent } from './room.component';
import { RoomListComponent } from './list/list.component';
import { RoomFormComponent } from './form/form.component';

const routes: Routes = [{ 
    path: '', 
    component: RoomComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: RoomListComponent },
      { path: 'form', component: RoomFormComponent }
    ],
    
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoomRoutingModule { }