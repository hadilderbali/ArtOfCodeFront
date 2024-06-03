import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReclamationCompetition } from '../models/reclamationCompetition';

@Injectable({
  providedIn: 'root',
})
export class ReclamationCompetitionService {
  private baseUrl: string = 'http://localhost:8089/user/api/v1/reclamation/';
  webSocketService: any;
  constructor(private http: HttpClient) {}
  getAllReclamations(): Observable<ReclamationCompetition[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.get<ReclamationCompetition[]>(this.baseUrl + 'getAllReclamations',{headers});
  }

  addreclamation(reclamation: ReclamationCompetition): Observable<ReclamationCompetition> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.post<ReclamationCompetition>(this.baseUrl + 'addReclamation', reclamation,{headers});
  }

 deleteRdeleteReclamationCompetition(id: number): Observable<void> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.delete<void>(this.baseUrl + 'delete/' + id,{headers});
  }
  getReclamationCompetitionById(reclamationIdt: number): Observable<ReclamationCompetition> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.get<ReclamationCompetition>(
      this.baseUrl + 'getReclamationCompetitionById/' + reclamationIdt,{headers}
    );
  }
  updateReclamationCompetition(id: number, reclamation: ReclamationCompetition): Observable<ReclamationCompetition> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.put<ReclamationCompetition>(
      `${this.baseUrl}updateReclamationCompetition/${id}`,
      reclamation,{headers}
    );
  }
  
  getEventsPaged(
    page: number,
    pageSize: number,
    reclamationStatus: null | string,
  ): Observable<any> {
    let options: string = `?page=${page}&pageSize=${pageSize}`;
    if (!!reclamationStatus) options += `&level=${reclamationStatus}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    const url = `${this.baseUrl}pagedd${options}`;
    return this.http.get<any>(url,{headers});
  }
 

  analyzeReclamationSentiment(reclamationId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/analyzeSentiment/${reclamationId}`);
  }

  getSentimentStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}sentiment-statistics`);
  }

  getTotalReclamations(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-reclamations`);
  }
  getReclamationsChartData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reclamations-chart-data`);
  }

  getDecisionForDashboard(): Observable<string> {
    return this.http.get(`${this.baseUrl}dashboard`, { responseType: 'text' });
  }
  
  
  exportComplaintsToCSV(): Observable<Blob> {
    return this.http.get('http://localhost:8081/api/reclamation/export/csv', { responseType: 'blob' });
  }

}
