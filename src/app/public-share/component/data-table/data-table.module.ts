import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material/ng-material.module';
import { DataTableComponent } from './data-table.component';



@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule
  ],
  exports: [
    DataTableComponent
  ]
})
export class DataTableModule { }
