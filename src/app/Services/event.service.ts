import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Models/event';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private selectedDateSubject = new BehaviorSubject<string>(''); // BehaviorSubject pour stocker la date sélectionnée
  selectedDate$ = this.selectedDateSubject.asObservable(); // Observable pour la date sélectionnée

  private baseURL = "http://localhost:8089/user/events/";

  constructor(private http: HttpClient) { 

  }
  private  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseURL + 'get',{ headers: this.headers });
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseURL + 'createEvent/', event,{ headers: this.headers });
  }

  removeEvent(idEvent: number): Observable<Event> {
    return this.http.delete<Event>(this.baseURL + 'delete/' + idEvent,{ headers: this.headers });
  }

  getEventById(idEvent: number): Observable<Event> {
    return this.http.get<Event>(this.baseURL + 'getEventById/' + idEvent,{ headers: this.headers });
  }

  updateEvent(body: Event, idEvent: number): Observable<Event> {
    return this.http.put<Event>(this.baseURL + 'updateEvent/' + idEvent, body,{ headers: this.headers });
  }
  // Méthode pour "Liker" un événement
  likeEvent(idEvent: number): Observable<Event> {
    return this.http.post<Event>(this.baseURL + 'likeEvent/' + idEvent, {},{ headers: this.headers });
  }

  // Méthode pour "Disliker" un événement
  dislikeEvent(idEvent: number): Observable<Event> {
    return this.http.post<Event>(this.baseURL + 'dislikeEvent/' + idEvent, {},{ headers: this.headers });
  }
  setSelectedDate(date: string) {
    this.selectedDateSubject.next(date); // Mettre à jour la date sélectionnée
  }
  
}
