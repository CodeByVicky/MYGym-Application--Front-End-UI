import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthoService {

  private baseApiUrl : string = environment.baseApiUrl;
  constructor(private http : HttpClient) { }

  loginUser(userInfoAutho : any) : Observable <any>{
    return this.http.post<any>(this.baseApiUrl+"/api/loginUser" ,userInfoAutho)
  }

  loginAdmin(adminInfoAutho : any) : Observable <any>{
    return this.http.post<any>(this.baseApiUrl+"/api/loginAdmin" ,adminInfoAutho)
  }
}
