import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from '../Models/job-offer';
@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
 private baseURL = "http://localhost:8089/user/api/v1/job";
  constructor( private httpClient: HttpClient ) { }
  getJobOffers(): Observable<JobOffer[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    console.log(localStorage.getItem("access_token"))
    return this.httpClient.get<JobOffer[]>(`${this.baseURL}/getoffer`,{headers});
  }
  addJobOffer(joboffer:JobOffer):Observable<object>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    console.log(headers)
    return this.httpClient.post(`${this.baseURL}/addOffer`,joboffer,{headers})
  }

}
