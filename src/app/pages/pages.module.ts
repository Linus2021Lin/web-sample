import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainFrameModule } from './main-frame/main-frame.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormDemoModule } from './form-demo/form-demo.module';
import { ModalDemoModule } from './modal-demo/modal-demo.module';
import { TableDemoModule } from './table-demo/table-demo.module';
import { TabLayoutDemoModule } from './tab-layout-demo/tab-layout-demo.module';
import { SpaLayoutDemoModule } from './spa-layout-demo/spa-layout-demo.module';
import { ChartDemoModule } from './chart-demo/chart-demo.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MainFrameModule,
    LoginModule,
    DashboardModule,
    FormDemoModule,
    ModalDemoModule,
    TableDemoModule,
    TabLayoutDemoModule,
    SpaLayoutDemoModule,
    ChartDemoModule
  ]
})
export class PagesModule { }
