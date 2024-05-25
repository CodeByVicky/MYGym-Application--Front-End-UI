import { Component } from '@angular/core';
import { AttendanceService } from '../../Services/attendance.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  ShowData: any[] = [];
  ShowDataPresent: any[] = [];
  ShowDataAbsent: any[] = [];
  currentItem: any;
  ShowDataTotal: number = 0;
  filteredData: any[] = [];
  filteredDatalist : any[] = [];
  ShowDataPresentCount : number = 0;
  ShowDataAbsentCount : number = 0;
constructor(private attendanceService : AttendanceService){}
  showModal: boolean = true; // Add this variable to control the visibility of the modal
  menuType : string = 'default';
  searchTerm: string = '';



  ngOnInit(): void {
   this.show();
 this.loadDataPresent();
 this.loadDataAbsent();
 this.todayDate();
 console.log("today Date"+this.todayDate())

 this.ShowData.forEach(item => {
  console.log(this.toLocalDateString(item.attendanceDate));
});
  }

  
  PresentColor(index: number, userId: string) {
    // const reversedIndex = this.ShowData.length - 1 - index;
    if (confirm('Do you want to commit this action?')) {
      this.attendanceService.markAttendance(userId).subscribe(
        (data) => {
          if (data.message === 'Attendance already marked for today') {
            alert('Attendance already marked for today');
          } else if (data.message === 'Attendance marked successfully') {
            alert('Attendance marked successfully...');
            this.show();
            this.loadDataPresent();
           this.loadDataAbsent();
            this.ShowData[index].actionClicked = !this.ShowData[index].actionClicked;
          } else {
            alert('Unexpected response from server');
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('Failed to mark attendance for userId: ' + userId);
        }
      );
    }
  }
  
  
  loadDataPresent(): void {
    // Load your data into ShowData here, for example via an HTTP request
    // This should set the initial state of actionClicked for each user
    this.attendanceService.getAttendanceData().subscribe(data => {
      this.ShowDataPresent = data;
      this.ShowDataPresentCount = this.ShowDataPresent.length;
    //  console.log(this.ShowDataPresent)
    });
  }
  
  loadDataAbsent(): void {
    // Load your data into ShowData here, for example via an HTTP request
    // This should set the initial state of actionClicked for each user
    this.attendanceService.getAttendanceDataAbsent().subscribe(data => {
      this.ShowDataAbsent = data;
      this.ShowDataAbsentCount = this.ShowDataAbsent.length;
     // console.log(this.ShowDataPresent)
    });
  }



  showTotal(){
    this.menuType ='default';
    this.show();
  }

  present(){
    this.menuType ='present'
    this.loadDataPresent();
  }

  absent(){
    this.menuType = 'absent'
    this.loadDataAbsent();
  }


  show(){
    this.attendanceService.showData()
    .subscribe(
      (data)=>{
        this.ShowData = data;
        this.filteredData = data; 
        this.ShowDataTotal = this.ShowData.length;
        console.log(data)
      },
      (error)=>{
        console.error('error fetching customers record :' ,error)
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

onSearchTermChangeTotalPresent(){
  if (this.searchTerm) {
    this.filteredData = this.ShowDataPresent.filter(item => item.userId.includes(this.searchTerm));
   
    if(this.filteredData.length != 0){
      this.filteredDatalist = this.ShowDataPresent;
    this.ShowDataPresent = this.filteredData;
    
    }else{
      alert('User not fond !!')
    }

      this.searchTerm = ''
  }
}


onSearchTermChangeTotalAbsent(){
  if (this.searchTerm) {
    this.filteredData = this.ShowDataAbsent.filter(item => item.userId.includes(this.searchTerm));
   
    if(this.filteredData.length != 0){
      this.filteredDatalist = this.ShowDataAbsent;
    this.ShowDataAbsent = this.filteredData;
    
    }else{
      alert('User not fond !!')
    }

      this.searchTerm = ''
  }
}



todayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
}

toLocalDateString(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-CA'); // 'en-CA' ensures the format 'YYYY-MM-DD'
}

isPresentToday(item: any): boolean {
  return item.isPresent === 1 && this.toLocalDateString(item.attendanceDate) === this.todayDate();
}

}
