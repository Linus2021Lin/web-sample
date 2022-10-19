import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainFrameModule } from './main-frame/main-frame.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MainFrameModule,
    LoginModule,
    DashboardModule
  ]
})
export class PagesModule { }
