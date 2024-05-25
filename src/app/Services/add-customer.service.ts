import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCustomerService {

  baseApiUrl : string = environment.baseApiUrl; 
  constructor(private http : HttpClient) { }

//addCustomer

addCustomer(RegistrationInfo : any) :Observable<any>
{
  return this.http.post<any> (this.baseApiUrl + "/api/create",RegistrationInfo)
}
  
}
