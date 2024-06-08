import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 import { Message } from './message';
import { Socket } from 'ngx-socket-io';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private apiUrl = 'http://localhost:8089/user/messages';

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.post<void>(this.apiUrl, message, { headers });
  }
  
}