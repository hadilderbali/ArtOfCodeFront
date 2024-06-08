import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  private baseUrl = 'http://localhost:8089/user/statistics';

  constructor(private http: HttpClient) { }

  getTotalCompetitions(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<number>(`${this.baseUrl}/competitions`,{headers});
  }

  getUserInfo(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<User[]>(`${this.baseUrl}/users`,{headers});
  }
  getTotalCandidacies(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<number>(`${this.baseUrl}/candidacies`,{headers});
  }

  getAverageGrade(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<number>(`${this.baseUrl}/average-grade`,{headers});
  }

  // Ajoutez d'autres méthodes pour d'autres statistiques...
}
