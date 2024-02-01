import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { ComponentModule } from '../../public-share/component/component.module';
import { DemoFormComponent } from '../../form-components/demo-form/demo-form.component';
import { ModalDemoComponent } from './modal-demo.component';
import { DemoComponentComponent } from './component/demo-component/demo-component.component';



@NgModule({
  declarations: [
    ModalDemoComponent,
    DemoFormComponent,
    DemoComponentComponent
  ],
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
