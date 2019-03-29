import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { RoomRoutingModule } from './room-routing.module';

import { RoomComponent } from './room.component';
import { RoomListComponent } from './list/list.component';
import { RoomFormComponent } from './form/form.component';
import { RoomService } from '../room/service/room.service';
import { MainPipe } from '../../pipes/pipes.module';

@NgModule({
  imports: [ SharedModule, RoomRoutingModule, MainPipe ],
  declarations: [
    RoomComponent,
    RoomListComponent,
    RoomFormComponent
  ],
  providers: [
    RoomService
  ]
})
export class RoomModule { }

