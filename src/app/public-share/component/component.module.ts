import { NgModule } from '@angular/core';
import { LabelInputModule } from './label-input/label-input.module';
import { PopUpModalModule } from './pop-up-modal/pop-up-modal.module';



@NgModule({
  exports: [
    LabelInputModule,
    PopUpModalModule
  ]
})
export class ComponentModule { }
