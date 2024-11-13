import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Club } from '../Models/club';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseURL = "http://192.168.33.10:8089/user/clubs/";

  constructor(private http: HttpClient) { 
  
  }
  private  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  getEvents(): Observable<Club[]> {
    return this.http.get<Club[]>(this.baseURL + 'get',{ headers: this.headers });
  }

  createClub(formData: FormData): Observable<any> {
    return this.http.post<Club>(`${this.baseURL}createClub/`, formData,{ headers: this.headers });
  }
  removeClub(clubId: number): Observable<Club> {
    return this.http.delete<Club>(this.baseURL + 'deleteClub/' + clubId,{ headers: this.headers });
  }
   getClubPhotoById(clubId: number): string {
    return `${this.baseURL}cphoto/${clubId}`;
  }


  getClubById(clubId: number): Observable<Club> {
    return this.http.get<Club>(this.baseURL + 'getClubById/' + clubId,{ headers: this.headers });
  }

  updateClub(body: Club, clubId: number): Observable<Club> {
    return this.http.put<Club>(this.baseURL + 'updateClub/' + clubId, body,{ headers: this.headers });
  }
 
  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.baseURL + 'get',{ headers: this.headers });
  }
}
