import { Component, OnInit } from '@angular/core';
import { AddCustomerService } from '../../Services/add-customer.service';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent implements  OnInit{
 
  constructor(private addcustomerService : AddCustomerService ,
    private router : Router){}

  RegistrationInfo : any ={
    name : '',
    userId : '' ,
    password : '',
    joinDate : '',
    mobileNumber : '',
    plan : '',
    city : '',
    profilePhoto : '' ,
    address : ''
  }


  ngOnInit(): void {
 
  }

  submit(){
    console.log(this.RegistrationInfo);
    
    this.addcustomerService.addCustomer(this.RegistrationInfo)
    .subscribe({
      next : (customer)=>{
        alert('record add successfull ...');
      this.router.navigate(['/main/login']);
        
      },
      error : (err) =>{
        console.log(err)
        alert('An error occurred while adding the record. Please try again later.');
      }
    })
  }




}


