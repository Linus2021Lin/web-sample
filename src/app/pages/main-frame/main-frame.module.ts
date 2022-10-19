import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentModule } from '../../public-share/component/component.module';
import { NgMaterialModule } from '../../public-share/ng-material/ng-material.module';
import { MainFrameOperatorService } from '../../public-share/service/main-frame-operator.service';
import { MainFrameComponent } from './main-frame.component';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import { TopNavBarComponent } from './component/top-nav-bar/top-nav-bar.component';
import { PageHandlerService } from './service/page-handler.service';
import { ConstantService } from './service/constant.service';



@NgModule({
  declarations: [
    MainFrameComponent,
    SideMenuComponent,
    TopNavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentModule,
    NgMaterialModule,
    TranslateModule
  ],
  providers: [
    MainFrameOperatorService,
    PageHandlerService,
    ConstantService
  ]
})
export class MainFrameModule { }
