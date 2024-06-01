import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 import { Message } from './message';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private apiUrl = 'http://localhost:8089/user/api/v1/api/messages';

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<void> {
    return this.http.post<void>(this.apiUrl, message);
  }
  
}