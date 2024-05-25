import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  baseApiUrl : string = environment.baseApiUrl;
  constructor(private http : HttpClient) { }

  searchRecord(userId : any) : Observable <any>{
   
    return this.http.get<any>(this.baseApiUrl + "/api/find/"+ userId)
  }

  searchRecordCount(userId : any) : Observable <any>{
   
    return this.http.get<any>(this.baseApiUrl + "/api/findCount/"+ userId)
  }

  searchWeightTotalList(userId : any) : Observable <any>{
   
    return this.http.get<any>(this.baseApiUrl + "/api/weightFind/"+ userId)
  }

  searchWeightTotal(userId : any) : Observable <any>{
   
    return this.http.get<any>(this.baseApiUrl + "/api/weightFindNew/"+ userId)
  }


  addWeight(userId: string, weightKg: number): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/weightAdd`, { userId ,weightKg});
  }

}
