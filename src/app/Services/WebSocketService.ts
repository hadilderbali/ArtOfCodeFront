import { Injectable } from '@angular/core';
import { catchError, filter, Observable, throwError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080/ws-reclamation');
  }

  listen(topic: string): Observable<any> {
    return this.socket$.asObservable().pipe(
      catchError(error => {
        console.error('WebSocket connection error:', error);
        return throwError('WebSocket connection failed');
      }),
      filter((message: any) => message.topic === topic)
    );
  }
}
