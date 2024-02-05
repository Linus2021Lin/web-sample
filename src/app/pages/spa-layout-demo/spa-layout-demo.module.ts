import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { SpaLayoutDemoComponent } from './spa-layout-demo.component';



@NgModule({
  declarations: [
    SpaLayoutDemoComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule
  ]
})
export class SpaLayoutDemoModule { }
