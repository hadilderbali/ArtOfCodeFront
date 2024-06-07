import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobApplication } from '../Model/JobApplication';
import { FormGroup } from '@angular/forms';
import { Page} from '../Model/Page';

@Injectable({
  providedIn: 'root'
})
export class JobapplicationService {
  private baseUrl = 'http://localhost:8089/user'

  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('access_token')}`
  );
  constructor(private httpClient: HttpClient) { }
  addJobApplication(formData: FormData, jobOfferId: number, dancerId: number): Observable<any> {
    const url = `${this.baseUrl}/jobapplication/addJobApp`;
    
  const headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('access_token')}`
  );
    return this.httpClient.post(url, formData, { params: { jobOfferId: jobOfferId.toString(), dancerId: dancerId.toString() },headers });
  }
    updateJobApplicationWithoutImage(id: number, updatedJobApplication: JobApplication): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/jobapplication/update/${id}`, updatedJobApplication, { responseType: 'text' });
  }
  
  
  getJobApps(): Observable<JobApplication[]>{
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpClient.get<JobApplication[]>(`${this.baseUrl}/jobapplication/getJobApps`,{headers})
  } 
  getJobApp(idD:number): Observable<JobApplication>{
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpClient.get<JobApplication>(`${this.baseUrl}/jobapplication/getJobApp/${idD}`,{headers})
  } 
  getJobAppPhotoById(idDancer: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpClient.get(`${this.baseUrl}/jobapplication/ImgJobApp/${idDancer}`, { responseType: 'blob', headers });
  }
  getJobApplicationsByDancerId(dancerId: number, page: number, size: number): Observable<Page<JobApplication>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    const url = `${this.baseUrl}/jobapplication/getpage/${dancerId}?page=${page}&size=${size}`;
    return this.httpClient.get<Page<JobApplication>>(url, { headers });
}

   acceptJobApplication(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
        return this.httpClient.put<any>(`${this.baseUrl}/jobapplication/accept/${id}`, {headers});
      }
  deleteJobApp(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpClient.delete(`http://localhost:8082/api/jobapplication/deleteJobApp/${id}`,{headers});
  }
  getJobApplicationByJobOfferId(jobOfferId: number): Observable<JobApplication> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpClient.get<JobApplication>(`${this.baseUrl}/jobapplication/${jobOfferId}`,{headers});
  }
  
}
