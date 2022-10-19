import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from '../../ng-material/ng-material.module';
import { LabelInputComponent } from './label-input.component';



@NgModule({
  declarations: [LabelInputComponent],
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  exports: [LabelInputComponent]
})
export class LabelInputModule { }
