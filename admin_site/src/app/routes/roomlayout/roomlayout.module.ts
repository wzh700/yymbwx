import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { RoomLayoutRoutingModule } from './roomlayout-routing.module';

import { RoomLayoutComponent } from './roomlayout.component';
import { RoomLayoutListComponent } from './list/list.component';
import { RoomLayoutFormComponent } from './form/form.component';
import { RoomLayoutService } from '../roomlayout/service/roomlayout.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, RoomLayoutRoutingModule, MainPipe ],
  declarations: [
    RoomLayoutComponent,
    RoomLayoutListComponent,
    RoomLayoutFormComponent
  ],
  providers: [
    RoomLayoutService
  ]
})
export class RoomLayoutModule { }

