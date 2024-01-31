import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './public-share/service/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';
import { FormDemoComponent } from './pages/form-demo/form-demo.component';
import { ModalDemoComponent } from './pages/modal-demo/modal-demo.component';


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
