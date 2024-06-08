import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from '../Models/job-offer';
@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
 private baseURL = "http://localhost:8081/api/job/offer";
  constructor( private httpClient: HttpClient ) { }
  getJobOffers(): Observable<JobOffer[]>{
    return this.httpClient.get<JobOffer[]>(`${this.baseURL}`);
  }
  addJobOffer(joboffer:JobOffer):Observable<object>{
    return this.httpClient.post(`${this.baseURL}`,joboffer)
  }

}
