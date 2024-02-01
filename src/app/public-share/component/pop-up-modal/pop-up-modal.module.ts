import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material/ng-material.module';
import { PopUpModalComponent } from './pop-up-modal.component';



@NgModule({
  declarations: [
    PopUpModalComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule
  ]
})
export class PopUpModalModule { }
