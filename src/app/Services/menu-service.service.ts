
// menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  private menuTypeSource = new BehaviorSubject<string>('guest');
  menuType$ = this.menuTypeSource.asObservable();

  setMenuType(menuType: string) {
    this.menuTypeSource.next(menuType);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('menuType', menuType);
    }
  }

  loadMenuType() {
    if (typeof localStorage !== 'undefined') {
      const storedMenuType = localStorage.getItem('menuType');
      if (storedMenuType) {
        this.menuTypeSource.next(storedMenuType);
      }
    }
  }
}
