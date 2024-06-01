import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidature } from './candidature';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private baseURL="http://localhost:8081/api/"
  constructor(private httpClient:HttpClient) { }
  addCandidature(competition: Candidature,idcompetition:number): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`+`Candidacy/addCandidacy/${idcompetition}/1`, competition);
  }
  getcadidaturebyuser(): Observable<string> {
    return this.httpClient.get<string>(`${this.baseURL}Candidacy/getbyuser/1`);
  }
  getallcadidature(): Observable<string> {
    return this.httpClient.get<string>(`${this.baseURL}Candidacy/allCandidacies`);
  }
  updateCompetitionCandidacy(competitionCandidacy: Candidature, id: number): Observable<any> {
    return this.httpClient.put(`${this.baseURL}Candidacy/updateCompetition/${id}`, competitionCandidacy);
  }
}
