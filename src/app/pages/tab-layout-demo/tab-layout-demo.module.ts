import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { TabLayoutDemoComponent } from './tab-layout-demo.component';



@NgModule({
  declarations: [
    TabLayoutDemoComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule
  ]
})
export class TabLayoutDemoModule { }
