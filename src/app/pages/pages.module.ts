import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainFrameModule } from './main-frame/main-frame.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormDemoModule } from './form-demo/form-demo.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MainFrameModule,
    LoginModule,
    DashboardModule,
    FormDemoModule
  ]
})
export class PagesModule { }
