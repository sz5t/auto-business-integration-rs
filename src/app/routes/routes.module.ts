import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import {AuthGuard} from '@core/utility/auth-guard';
import {AlainAuthModule, DA_STORE_TOKEN, MemoryStore} from '@delon/auth';
import {ModuleWithProviders} from '@angular/compiler/src/core';

@NgModule({
    imports: [ SharedModule, RouteRoutingModule, AlainAuthModule.forRoot({ login_url: '/passport/login' })],
    declarations: [
        DashboardComponent,
        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component
    ],
    providers: [
      AuthGuard
    ]
})

export class RoutesModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: RoutesModule,
      providers: [{ provide: DA_STORE_TOKEN, useClass: MemoryStore }]
    };
  }
}
