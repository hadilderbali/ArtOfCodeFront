import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Competition } from './competition';


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private baseURL="http://localhost:8089/user/api/v1/"
  private token = localStorage.getItem("access_token")
  constructor(private httpClient:HttpClient) { }
  getAllCompetitions(): Observable<Competition[]>{
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log("azedazed")
    return this.httpClient.get<Competition[]>(`${this.baseURL}` + `competition/all` ,{headers});
  }
  addCompetition(competition: Competition): Observable<Object>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.post(`${this.baseURL}`+`competition/addCompetition`, competition,{headers});
  }
  

  searchCompetitions(keyword: string): Observable<Competition[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.get<Competition[]>(`${this.baseURL}competition/search?keyword=${keyword}`, {headers});
}

 
  DeleteCompetition(id: number){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.delete(`${this.baseURL}`+`competition/deleteCompetition/${id}`,{headers});
  }
  getCategoryTitle(categoryId: number): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.get<string>(`${this.baseURL}/categories/${categoryId}/title`,{headers});
  }
  public updatecompetition(id: number, a: Competition){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.put(`${this.baseURL}`+`competition/updateCompetition/${id}`,a,{headers});
  }
  public getcompetitionbyid(id:number){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.get<Competition>(`${this.baseURL}`+`competition/getbyid/${id}`,{headers})
  }
  
getEventsPaged(page: number, pageSize: number): Observable<any> {
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
  const url = `${this.baseURL}competition/pagedd?page=${page}&pageSize=${pageSize}`;
  return this.httpClient.get<any>(url,{headers});
}



}
