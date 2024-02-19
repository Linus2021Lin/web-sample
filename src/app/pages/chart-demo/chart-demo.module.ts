import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { ChartDemoComponent } from './chart-demo.component';



@NgModule({
  declarations: [
    ChartDemoComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule
  ]
})
export class ChartDemoModule { }
