import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject, map, switchMap, tap, timer } from 'rxjs';
import { JobOffer } from '../Model/JobOffer';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { Page } from '../Model/Page';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  dancerId: number = 9;
  private baseUrl = 'http://localhost:8089/user'; // Base URL of your backend
  public dataForm!: FormGroup;
  private newJobOfferSubject: Subject<JobOffer> = new Subject<JobOffer>();

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}
  addJobOffer(formData: FormData, recruiterId: number): Observable<JobOffer> {
    const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token')}`,
        
    );
    headers.set('content-type', 'multipart/form-data')
    const url = `${this.baseUrl}/job/addOffer?recruiterId=${recruiterId}`;
    console.log(formData)
    return this.httpClient.post<JobOffer>(url, formData, { headers })
    
}

  // Observable to subscribe to new job offers
  getNewJobOffers(): Observable<JobOffer> {
    return this.newJobOfferSubject.asObservable();
  }

  checkForNotifications(): Observable<boolean> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    // Set an interval to check for notifications every 10 seconds
    return timer(0, 10000).pipe(
      switchMap(() =>
        this.httpClient.get<any>(`${this.baseUrl}/job/checkNotifications`, {
          headers,
        })
      ),
      map((response) => response.hasNotifications)
    );
  }

  getJobOffer(idr: number): Observable<JobOffer> {
     const headers = new HttpHeaders().set(
       'Authorization',
       `Bearer ${localStorage.getItem('access_token')}`
     );
    return this.httpClient.get<JobOffer>(`${this.baseUrl}/job/offer/${idr}`,{headers});
  }

  getJobOffers(
    keyword?: string,
    location?: string,
    page: number = 0,
    size: number = 3
  ): Observable<Page<JobOffer>> {
    // Construct the URL with the provided criteria
    const url = `${this.baseUrl}/job/getoffer`;

     const headers = new HttpHeaders().set(
       'Authorization',
       `Bearer ${localStorage.getItem('access_token')}`
     );
    // Construct the parameters object with the provided criteria
    const params: any = {
      page: page.toString(),
      size: size.toString(),
    };
    if (keyword) {
      params.keyword = keyword;
    }
    if (location) {
      params.location = location;
    }

    // Send the HTTP GET request with the constructed URL and parameters
    return this.httpClient.get<Page<JobOffer>>(url, { params,headers });
  }

  updateJobOfferWithoutFile(id: number, jobOffer: JobOffer): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/job/update/${id}`, jobOffer);
  }
  public deletjob(idr: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpClient.delete(
      `http://localhost:8089/user/job/DeletejobOffer/${idr}`,
      { headers }
    );
  }
  getJobOfferPhoto(idR: number): Observable<string> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    const url = `${this.baseUrl}/job/ImgJobOffer/${idR}`;
    console.log(localStorage.getItem('access_token'));
    // Set responseType to 'blob' because the server is returning binary data
    const img = this.httpClient.get(url, { headers, responseType: 'blob' }).pipe(
      map((blob: Blob) => URL.createObjectURL(blob)) // Create a Blob URL from the Blob
    );

    img.subscribe((blobUrl: string) => console.log(blobUrl)); // Log the actual Blob URL

    return img;
  }
  getJobOffersByUserId(
    
    userId: number,
    page: number,
    size: number
  ): Observable<Page<JobOffer>> {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token')}`
      );

    return this.httpClient.get<Page<JobOffer>>(
      `${this.baseUrl}/job/Page_joboffers/${userId}?page=${page}&size=${size}`,
      { headers }
    );
  }

  searchJobOffers(
    title: string = '',
    location: string = '',
    page: number = 0,
    size: number = 3
  ): Observable<Page<JobOffer>> {
    const url = `${this.baseUrl}/job/search?title=${title}&location=${location}&page=${page}&size=${size}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpClient.get<Page<JobOffer>>(url,  { headers }).pipe(
      map((page) => {
        // Store search criteria in cookies after successful search
        this.cookieService.set(`keyword_${this.dancerId}`, title);
        this.cookieService.set(`location_${this.dancerId}`, location);
        return page;
      })
    );
  }
}