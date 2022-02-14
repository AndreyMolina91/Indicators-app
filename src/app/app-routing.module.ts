import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: '', component: DefaultComponent, children: [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path: 'dashboard',component: DashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
