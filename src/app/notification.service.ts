import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8089/user'; 

  constructor(private http: HttpClient,private webSocketService: WebsocketService) {
    
   }

   sendNotifications(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<string>(`${this.apiUrl}/notifications/sendResults`,{headers});

  }
  getAllNotifications(): Observable<Notification[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<Notification[]>(`${this.apiUrl}/notifications/getall`,{headers});
  }
  getUserNotifications(userId: number): Observable<Notification[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    const url = `${this.apiUrl}/notifications/getuser/${userId}/notifications`; // Modifiez l'URL pour correspondre à votre API
    return this.http.get<Notification[]>(url,{headers});
  }
  getUserById(userId: number): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<User>(`${this.apiUrl}/notifications/getuser/${userId}`,{headers});
  }
}
