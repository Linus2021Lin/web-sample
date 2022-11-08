import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material/ng-material.module';
import { BasicModalComponent } from './component/basic-modal/basic-modal.component';
import { FormModalComponent } from './component/form-modal/form-modal.component';
import { ModalInterfaceService } from './service/modal-interface.service';



@NgModule({
  declarations: [
    BasicModalComponent,
    FormModalComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule
  ],
  providers: [
    ModalInterfaceService
  ]
})
export class PopUpModalModule { }
