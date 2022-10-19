import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainFrameComponent } from './pages/main-frame/main-frame.component';


const routes: Routes = [

  {
    path: '',
    component: MainFrameComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [ChildrenGuard],
    children: [
      { path: 'home', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
