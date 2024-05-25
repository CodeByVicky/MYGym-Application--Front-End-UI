import { Component } from '@angular/core';
import { AuthoService } from '../../Services/autho.service';
import {Router, RouterLink} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuServiceService } from '../../Services/menu-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private authoService : AuthoService ,private router: Router ,private menuService:MenuServiceService){}
  userInfoAutho : any ={
    userId : '',
    password : ''
  }
  isText: boolean = false;
  type: string = "password";
  login(){
    //  this.authoService.loginUser(this.userInfoAutho).subscribe(
    //   ()=>{
    //     if (typeof localStorage !== 'undefined') {
    //       // Clear local storage
    //       localStorage.clear();
       
        
    //       localStorage.setItem('userId', this.userInfoAutho.userId);
    //       this.menuService.setMenuType('user');
    //       this.router.navigate(['/main/user']);
    //     } else {
    //       console.warn('localStorage is not available.');
    //     }
    //     alert('Login Successfully...')
  
    //   },  (error: HttpErrorResponse) => {
    //     console.error(error);
    //     if (error.status === 404) {
    //       alert('The requested resource was not found. Please check the URL and try again.');
    //     } else {
    //       alert('Wrong Credentials...');
    //     }
    //   }
    // );
     
   // if(this.userInfoAutho.userId == 'thevicky144' && this.userInfoAutho.password == 'the144'){
       localStorage.setItem('userId', this.userInfoAutho.userId);
          this.menuService.setMenuType('user');
          this.router.navigate(['/main/user']);
//}else {
   // alert('Wrong Credentials...');
 // }
}
  

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.type = "text") : (this.type = "password");
  }
}
