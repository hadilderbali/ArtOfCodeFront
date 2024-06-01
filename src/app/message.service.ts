// message.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Message } from './message';
 
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8081/api/messages';

  constructor(private http: HttpClient) { }

  getMessagesBetweenUsers(senderId: number, recipientId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${senderId}/${recipientId}`);
  }


  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }
  private messageUpdateSource = new Subject<void>();

  messageUpdated$ = this.messageUpdateSource.asObservable();

  announceMessageUpdated(): void {
    this.messageUpdateSource.next();
  }
  
}