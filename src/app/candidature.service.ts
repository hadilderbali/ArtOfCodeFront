import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidature } from './candidature';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private baseURL="http://localhost:8089/user/"
  constructor(private httpClient:HttpClient) { }
  addCandidature(competition: Candidature,idcompetition:number): Observable<Object>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.httpClient.post(`${this.baseURL}`+`Candidacy/addCandidacy/${idcompetition}/1`, competition,{headers});
  }
  getcadidaturebyuser(): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.get<string>(`${this.baseURL}Candidacy/getbyuser/1`,{headers});
  }
  getallcadidature(): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.get<string>(`${this.baseURL}Candidacy/allCandidacies`,{headers});
  }
  updateCompetitionCandidacy(competitionCandidacy: Candidature, id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.httpClient.put(`${this.baseURL}Candidacy/updateCompetition/${id}`, competitionCandidacy,{headers});
  }
}
