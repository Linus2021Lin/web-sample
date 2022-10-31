import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { ComponentModule } from '../../public-share/component/component.module';
import { FormDemoComponent } from './form-demo.component';



@NgModule({
  declarations: [FormDemoComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentModule
  ]
})
export class FormDemoModule { }
