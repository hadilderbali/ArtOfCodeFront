import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grades } from './grades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  private baseURL="http://localhost:8089/user/"

  constructor(private httpClient:HttpClient) { }
  addgrades(grades: Grades,id:number): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`+`grades/addGrades/${id}`, grades);
  }

}
