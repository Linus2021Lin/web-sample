import { NgModule } from '@angular/core';
import { LabelInputModule } from './label-input/label-input.module';
import { PopUpModalModule } from './pop-up-modal/pop-up-modal.module';
import { DataTableModule } from './data-table/data-table.module';



@NgModule({
  exports: [
    LabelInputModule,
    PopUpModalModule,
    DataTableModule
  ]
})
export class ComponentModule { }
