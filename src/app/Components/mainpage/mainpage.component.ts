import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuServiceService } from '../../Services/menu-service.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent  implements OnInit{
  menuListMaxHeight = "0px";
return: any;
  constructor(private route: Router,private menuService:MenuServiceService) {}
  menuType: string = 'guest';

  ngOnInit(): void {
    this.menuService.menuType$.subscribe(menuType => {
      this.menuType = menuType;
    });

    // Load menu type from local storage
    this.menuService.loadMenuType();
  }
 
 

  toggleMenu() {
    this.menuListMaxHeight = this.menuListMaxHeight === "0px" ? "300px" : "0px";

    
  }
  
  logOut(){
    this.menuService.setMenuType('guest');
    // Clear local storage
    localStorage.clear();
  }



}
