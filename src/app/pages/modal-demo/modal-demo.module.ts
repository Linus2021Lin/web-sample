import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { ComponentModule } from '../../public-share/component/component.module';
import { ModalDemoComponent } from './modal-demo.component';
import { ModalFormComponent } from './component/modal-form/modal-form.component';



@NgModule({
  declarations: [ModalDemoComponent, ModalFormComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentModule
  ]
})
export class ModalDemoModule { }
