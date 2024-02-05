import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './public-share/service/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';
import { FormDemoComponent } from './pages/form-demo/form-demo.component';
import { ModalDemoComponent } from './pages/modal-demo/modal-demo.component';
import { TableDemoComponent } from './pages/table-demo/table-demo.component';
import { SpaLayoutDemoComponent } from './pages/spa-layout-demo/spa-layout-demo.component';
import { TabLayoutDemoComponent } from './pages/tab-layout-demo/tab-layout-demo.component';


const routes: Routes = [

  {
    path: '',
    component: MainFrameComponent,
    canActivate: [AuthGuardService],
    // canActivateChild: [ChildrenGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'formDemo', component: FormDemoComponent },
      { path: 'modalDemo', component: ModalDemoComponent },
      { path: 'tableDemo', component: TableDemoComponent },
      { path: 'spaLayoutDemo', component: SpaLayoutDemoComponent },
      { path: 'tabLayoutDemo', component: TabLayoutDemoComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
