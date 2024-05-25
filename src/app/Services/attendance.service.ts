import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  
  baseApiUrl : string = environment.baseApiUrl;
  constructor(private http : HttpClient) { }


  showData() : Observable<any>{
    return this.http.get<any> (this.baseApiUrl +"/api/showTotal");
  }

  getAttendanceData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/api/attendanceData`);
  }
  getAttendanceDataAbsent(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/api/attendanceDataAbsent`);
  }

  markAttendance(userId: string): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/attendance`, { userId });
  }
}
