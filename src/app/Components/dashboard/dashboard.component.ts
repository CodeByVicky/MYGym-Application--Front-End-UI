import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{

  ngOnInit(): void {
    this.show();
    this.Expires();
    this.Expired();
    this.cancelledD();
  }
constructor(private dashbordService :DashboardService ){}

ShowData: any[] = [];
SearchData : any[] =[];
ShowDataExpires: any[] = [];
ShowDataExpired: any[] = [];
ShowDataCancelled: any[] = [];

  ShowDataTotal : number = 0;
  ShowDataTotalExpires : number = 0;
  ShowDataTotalExpired : number = 0;
  ShowDataTotalCancelled : number = 0;


  filteredData: any[] = [];
  filteredDatalist : any[] = [];
  searchTerm: string = '';

  RegistrationInfo: any = {
   
  };
  currentItem: any;
  
  showModal: boolean = false; // Add this variable to control the visibility of the modal
  showModal1: boolean = false;
  
  menuType: string = 'default';

  total_user(){
    this.menuType = 'total_user';
  }

  expires(){
    this.menuType = 'expires';
  }

  expired(){
    this.menuType = 'expired';
   // alert('work')
  }

  cancelled(){
    this.menuType = 'cancelled';
  }

show(){
  this.dashbordService.showData()
  .subscribe(
    (data)=>{
      this.ShowData = data;
      this.filteredData = data; 
      this.ShowDataTotal = this.ShowData.length;
      //console.log(data)
    },
    (error)=>{
      console.error('error fetching customers record :' ,error)
    }
  );
}
 
Expires(){
  this.dashbordService.showDataExpires()
  .subscribe(
    (data)=>{
      this.ShowDataExpires = data;
      this.filteredData = data; 
      this.ShowDataTotalExpires = this.ShowDataExpires.length;
     
    },
    (error)=>{
      console.error('error fetching customers record :' ,error)
    }
  );
}


Expired(){
  this.dashbordService.showDataExpired()
  .subscribe(
    (data)=>{
      this.ShowDataExpired = data;
      this.filteredData = data; 
    //  console.log(this.ShowDataExpired)
      this.ShowDataTotalExpired = this.ShowDataExpired.length;
     
    },
    (error)=>{
      console.error('error fetching customers record :' ,error)
    }
  );
}

cancelledD(){
  this.dashbordService.showcancelled()
  .subscribe(
    (data)=>{
      this.ShowDataCancelled = data;
      this.filteredData = data; 
      this.ShowDataTotalCancelled = this.ShowDataCancelled.length;
     
    },
    (error)=>{
      console.error('error fetching customers record :' ,error)
    }
  );
}

deleteRecord(userId: string) {
  const userConfirmed = confirm(`Are you sure you want to delete User ID ${userId}?`);

  if (userConfirmed) {
    console.log(`Deleting user with ID: ${userId}`);
    this.dashbordService.deleteRecord(userId).subscribe(
      () => {
        this.show();
        this.Expires();
      this.Expired();
      this.cancelledD();
        alert(`User ID ${userId} successfully deleted.`);
      },
      (error) => {
        console.error('Error deleting user record:', error);
        alert(`Failed to delete User ID ${userId}. Please try again.`);
      }
    );
  } else {
    console.log(`Deletion of User ID ${userId} canceled.`);
  }
}

editRecord(userId: string) {
  this.showModal1 = true;
  this.dashbordService.searchRecord(userId)
    .subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.RegistrationInfo = data[0]; // Access the first element if it's an array
          this.parseAndFormatDates(this.RegistrationInfo); // Parse and format dates
         
        } else {
          console.error('Empty data returned');
        }
      },
      (error) => {
        console.error('Error searching user record:', error);
      }
    );
}

parseAndFormatDates(data: any) {
  if (data.joinDate) {
    data.joinDate = new Date(data.joinDate).toISOString().slice(0, 10); // Format joinDate
  }
}

close(){
  this.showModal1= false;
  this.updatePl = false;
}

submit(){
  console.log(this.RegistrationInfo);

  this.dashbordService.updateRecord(this.RegistrationInfo)
  .subscribe(
    ()=>{
      this.show();
      this.Expires();
      this.Expired();
      this.cancelledD();
      alert('Record Update Sucessfull....');
      this.showModal1= false;
     
    },(error)=>{
      console.error('Error Updating user record:', error);
    }
  );
}

updatePl : boolean = false;

updatePlan(userId : string){
this.updatePl = true;

  this.dashbordService.searchRecord(userId)
  .subscribe(
    (data) => {
      if (Array.isArray(data) && data.length > 0) {
        this.RegistrationInfo = data[0]; // Access the first element if it's an array
      
       
      } else {
        console.error('Empty data returned');
      }
    },
    (error) => {
      console.error('Error searching user record:', error);
    }
  );
}


update(){
  console.log(this.RegistrationInfo);

  this.dashbordService.planUpdate(this.RegistrationInfo)
  .subscribe(
    ()=>{
      this.show();
      this.Expires();
      this.Expired();
      this.cancelledD();
      alert('Plan Update Sucessfull....');
      this.showModal1= false;
     
    },(error)=>{
      console.error('Error Updating user record:', error);
    }
  );
}

onSearchTermChangeTotal() {
  if (this.searchTerm) {
    this.filteredData = this.ShowData.filter(item => item.userId.includes(this.searchTerm));
   
    if(this.filteredData.length != 0){
      this.filteredDatalist = this.ShowData;
    this.ShowData = this.filteredData;
    
    }else{
      alert('User not fond !!')
    }

      this.searchTerm = ''
  }
 
}

onSearchTermChangeExpires(){
  if (this.searchTerm) {
    this.filteredData = this.ShowDataExpires.filter(item => item.userId.includes(this.searchTerm));
   
    if(this.filteredData.length != 0){
      this.filteredDatalist = this.ShowDataExpires;
      this.ShowDataExpires = this.filteredData;
    
    }else{
      alert('User not fond !!')
    }
    
      this.searchTerm = ''
  }
}



onSearchTermChangeExpired(){
  if (this.searchTerm) {
    this.filteredData = this.ShowDataExpired.filter(item => item.userId.includes(this.searchTerm));
   
    if(this.filteredData.length != 0){
      this.filteredDatalist = this.ShowDataExpired;
      this.ShowDataExpired = this.filteredData;
    
    }else{
      alert('User not fond !!')
    }
    
      this.searchTerm = ''
  }
}


onSearchTermChangeCancelled(){
  if (this.searchTerm) {
    this.filteredData = this.ShowDataCancelled.filter(item => item.userId.includes(this.searchTerm));
   
    if(this.filteredData.length != 0){
      this.filteredDatalist = this.ShowDataCancelled;
      this.ShowDataCancelled = this.filteredData;
    
    }else{
      alert('User not fond !!')
    }
    
      this.searchTerm = ''
  }
}








}






