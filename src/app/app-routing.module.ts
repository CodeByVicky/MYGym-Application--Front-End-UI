import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './Components/mainpage/mainpage.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { PlanComponent } from './Components/plan/plan.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UserListComponent } from './Components/user-list/user-list.component';





const routes: Routes = [
  {path:'main',component:MainpageComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path : 'home',component:HomepageComponent},
    {path : 'registraion',component:RegistrationPageComponent},
    {path : 'login',component:LoginPageComponent},
    {path : 'admin' ,component:AdminLoginComponent},
    {path : 'plan' , component:PlanComponent},
    {path : 'user' , component:UserProfileComponent},
    {path : 'dash' , component:DashboardComponent},
    {path : 'list' , component:UserListComponent}
    
  ]},
  {path: '',redirectTo:'main',pathMatch:'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
