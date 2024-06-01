import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }
 
  public setAuthenticationResponse(response: any): void {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    localStorage.setItem("role", response.role);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  public getRole(): string | null {
    return localStorage.getItem("role");
  }
  getDataFromToken(token:string|null){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("service",headers)
    return this.http.post<any>('http://localhost:8089/user/api/v1/auth/decode-token',{},{headers})
  }

  public clearAuthentication(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  }
  public isLoggedIn(){
    return this.getRole()&&this.getAccessToken;
  }
}
