import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  private baseUrl = 'http://localhost:8081/api/statistics';

  constructor(private http: HttpClient) { }

  getTotalCompetitions(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/competitions`);
  }

  getUserInfo(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  getTotalCandidacies(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/candidacies`);
  }

  getAverageGrade(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average-grade`);
  }

  // Ajoutez d'autres méthodes pour d'autres statistiques...
}
