import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { LoginComponent } from './login.component';
import { ConstantService } from './service/constant.service';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ConstantService
  ]
})
export class LoginModule { }
