import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeComponent } from './components/employee/employee.component';
import {FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserIdleModule } from 'angular-user-idle';
import { WebAppInterceptor } from './interceptors/web-app.interceptor';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    EmployeeComponent
  ],
  imports: [
  FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserIdleModule.forRoot({idle:0, timeout: 10, ping: 10})
  
  ],

  providers: [
  {  provide: HTTP_INTERCEPTORS,
    useClass: WebAppInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
