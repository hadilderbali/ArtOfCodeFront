// message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Message } from './message';
 
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8089/user/messages';
  constructor(private http: HttpClient) { }

  getMessagesBetweenUsers(senderId: number, recipientId: number): Observable<Message[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<Message[]>(`${this.apiUrl}/${senderId}/${recipientId}`, { headers });
  }


  sendMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.post<Message>(this.apiUrl, message,{headers});
  }
  private messageUpdateSource = new Subject<void>();

  messageUpdated$ = this.messageUpdateSource.asObservable();

  announceMessageUpdated(): void {
    this.messageUpdateSource.next();
  }
  
}