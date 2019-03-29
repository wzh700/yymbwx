import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';

import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

import { UserLoginComponent } from './passport/login/login.component';
import { AuthenticationService } from './passport/login/login.service';

import { MainPipe } from '../pipes/pipes.module';


@NgModule({
    imports: [ SharedModule, RouteRoutingModule, MainPipe ],
    declarations: [

        // passport pages
        UserLoginComponent,

        // single pages
        // CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component,

    ],
    providers: [ AuthenticationService ]
})

export class RoutesModule {}
