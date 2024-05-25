import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../Services/user-profile.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { MenuServiceService } from '../../Services/menu-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  user: string = '';
  showUserData: any ={}; // Remove initial name assignment
  showUserDataWeight : any = {};
  showWeightTotalList : any[] = [];
   updateInfo : any = {
    weight :null
   };
  showUserDataCount : any[] =[];
  menuType: string = 'default';

  constructor(private userProfileService: UserProfileService ,private router: Router,private menuService:MenuServiceService) {}

  ngOnInit(): void {

   

    this.local();
    this.showData();
    this.showDataCount();
this.searchWeightTotal();
this.searchWeightTotalList();
   // console.log(this.showUserDataCount)

   
  }

  local(){
    if (typeof localStorage !== 'undefined') {
      // Retrieve username and userId from local storage
      const storedUsername = localStorage.getItem('userId');
   

      // Check if both values exist in local storage
      if (storedUsername) {
        this.user = storedUsername;
      
      } 
  }
}

logOut(){
  this.menuService.setMenuType('guest');
    // Clear local storage
    this.router.navigate(['/main']);
    localStorage.clear();
}

  showData() {
    this.userProfileService.searchRecord(this.user).subscribe(
      (data) => {
        this.showUserData = data;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  showDataCount(){
    this.userProfileService.searchRecordCount(this.user).subscribe(
      (data) =>{
     this.showUserDataCount = data;
      },(error)=>{
        console.error(error)
      }
    )
  }
  toggle : boolean = false;
  showCountAtten(){
    this.toggle = !this.toggle;
    this.menuType = this.toggle ? 'attendance' : '';
  }

  showCountWeight(){
    this.toggle = !this.toggle;
    this.menuType = this.toggle ? 'weight' : '';
  }
  update(){
   // alert()
    this.toggle = !this.toggle;
    this.menuType = this.toggle ? 'update' : '';
  }

  searchWeightTotal(){
    this.userProfileService.searchWeightTotal(this.user).subscribe(
      (data)=>{
         this.showUserDataWeight = data;
         this.updateInfo.weight = this.showUserDataWeight.weightKg;
        // console.log(this.showUserDataWeight)
      },(error)=>{
        console.log(error);
      }
    )
  }


  searchWeightTotalList(){
    this.userProfileService.searchWeightTotalList(this.user).subscribe(
      (data)=>{
          this.showWeightTotalList = data;
      }
      ,(error)=>{
        console.error(error)
      }
    )
  }


  AddInfoWeight(){
    this.userProfileService.addWeight(this.user,this.updateInfo.weight).subscribe(
      ()=>{
        this.searchWeightTotal();
        alert('record add succesfull...')
        this.menuType = 'default'
      },(error)=>{
      console.log(error)
      }
    )
  }
}
