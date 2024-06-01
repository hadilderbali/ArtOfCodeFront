import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081/api'; 

  constructor(private http: HttpClient,private webSocketService: WebsocketService) {
    
   }

   sendNotifications(): Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/notifications/sendResults`);

  }
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications/getall`);
  }
  getUserNotifications(userId: number): Observable<Notification[]> {
    const url = `${this.apiUrl}/notifications/getuser/${userId}/notifications`; // Modifiez l'URL pour correspondre à votre API
    return this.http.get<Notification[]>(url);
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/notifications/getuser/2`);
  }
}
