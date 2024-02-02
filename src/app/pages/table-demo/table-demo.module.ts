import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { ComponentModule } from '../../public-share/component/component.module';
import { TableDemoComponent } from './table-demo.component';



@NgModule({
  declarations: [TableDemoComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule,
    ComponentModule
  ]
})
export class TableDemoModule { }
