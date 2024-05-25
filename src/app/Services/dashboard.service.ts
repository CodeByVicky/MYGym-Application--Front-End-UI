import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseApiUrl : string = environment.baseApiUrl;
  constructor(private http : HttpClient) { }

  showData() : Observable<any>{
    return this.http.get<any> (this.baseApiUrl +"/api/show");
  }

  showDataExpires() : Observable<any>{
    return this.http.get<any> (this.baseApiUrl +"/api/expires");
  }

  showDataExpired() : Observable<any>{
    return this.http.get<any> (this.baseApiUrl +"/api/expired");
  }

  showcancelled() : Observable<any>{
    return this.http.get<any> (this.baseApiUrl +"/api/cancelled");
  }

  deleteRecord(userId : string) : Observable<any>{
    return this.http.delete<any>(this.baseApiUrl + "/api/delete/" + userId)
  }


  searchRecord(userId : any) : Observable <any>{
   
    return this.http.get<any>(this.baseApiUrl + "/api/search/"+ userId)
  }

  updateRecord(RegistrationInfo : any) : Observable <any>{
    return this.http.put<any>(this.baseApiUrl + "/api/update" , RegistrationInfo)
  }

  planUpdate(RegistrationInfo : any) : Observable <any>{
    return this.http.put<any>(this.baseApiUrl + "/api/plan" ,RegistrationInfo) 
  }
}
