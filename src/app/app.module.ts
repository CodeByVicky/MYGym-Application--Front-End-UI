import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MainpageComponent } from './Components/mainpage/mainpage.component';

import { HomepageComponent } from './Components/homepage/homepage.component';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { PlanComponent } from './Components/plan/plan.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
 
    HomepageComponent,
      RegistrationPageComponent,
      LoginPageComponent,
      AdminLoginComponent,
      PlanComponent,
      UserProfileComponent,
      DashboardComponent,
      UserListComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   FormsModule,
   HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
