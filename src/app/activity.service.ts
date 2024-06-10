import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, httpOptions);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password }, httpOptions);
  }

  addActivity(username: string, description: string, time: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/activities`, { username, description, time }, httpOptions);
  }

  getActivities(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/activities?username=${username}`);
  }
}