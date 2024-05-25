import { Component } from '@angular/core';
import { AuthoService } from '../../Services/autho.service';
import { MenuServiceService } from '../../Services/menu-service.service';
import {  Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  constructor(private authoService:AuthoService ,private menuService :MenuServiceService ,private router : Router){}
  adminInfoAutho: any = {
    email : '',
    password : ''
  }
  isText: boolean = false;
  type: string = "password";

  login(){
    // this.authoService.loginAdmin(this.adminInfoAutho).subscribe(
    //   ()=>{
      
    //     alert('Login Successfully...')
    //     this.menuService.setMenuType('admin');
    //     this.router.navigate(['/main/dash']);
  
    //   },  (error: HttpErrorResponse) => {
    //     console.error(error);
    //     if (error.status === 404) {
    //       alert('The requested resource was not found. Please check the URL and try again.');
    //     } else {
    //       alert('Wrong Credentials...');
    //     }
    //   }
    // );
  //  if(this.adminInfoAutho.email == 'thevicky144@gmail.com' && this.adminInfoAutho.password == 'the144'){
              alert('Login Successfully...')
        this.menuService.setMenuType('admin');
        this.router.navigate(['/main/dash']);
  //  }else {
  //          alert('Wrong Credentials...');
 //         }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.type = "text") : (this.type = "password");
  }
}
