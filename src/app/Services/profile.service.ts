import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  addProfile(profileData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token); // Log the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers); // Log the headers
    return this.http.post<any>('http://localhost:8089/user/api/v1/auth/profile/add', profileData, { headers });
  }

  getDataFromToken(token:string|null){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("service",headers)
    return this.http.post<any>('http://localhost:8089/user/api/v1/auth/decode-token',{},{headers})
  }
  getUserById(id:any){
    return this.http.get<any>(`http://localhost:8089/user/api/v1/auth/user/${id}`)
  }
}
