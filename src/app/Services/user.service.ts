import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getDataFromToken(token: any) {
    throw new Error('Method not implemented.');
  }
  submit(value: any) {
    throw new Error('Method not implemented.');
  }
  PATH_OF_API="http://localhost:8089";
  requestHeader=new HttpHeaders({"No-Auth":"True"}

  );
  constructor(private httpclient: HttpClient) { 

  }
  public login(loginData: any){
    return this.httpclient.post(this.PATH_OF_API+"/user/api/v1/auth/authenticate",loginData)
}
public register(registerData: any) {
  return this.httpclient.post(this.PATH_OF_API + "/user/api/v1/auth/register", registerData);
}
getAllUsers() {
  return this.httpclient.get<any[]>( this.PATH_OF_API+"/user/api/v1/auth/admin/getall");
}
getUserFollowerUsers(userId: string | null)  {
  return this.httpclient.get<any[]>(`http://localhost:8089/user/api/v1/auth/getUserFollowerUsers/${userId}`);
}

followUser(userId: number, followUserId: number) {
  return this.httpclient.post<any[]>(`http://localhost:8089/user/api/v1/auth/followUser/${userId}/${followUserId}`, {});
}

unfollowUser(userId: number, unfollowUserId: number) {
  return this.httpclient.post<any[]>(`http://localhost:8089/user/api/v1/auth/unfollowUser/${userId}/${unfollowUserId}`, {});
}


getUserFollowingUsers(userId: number) {
  return this.httpclient.get<any[]>(`http://localhost:8089/user/api/v1/auth/getUserFollowingUsers/${userId}`);
}
getUsersSuggested(userId:number){
  return this.httpclient.get<any[]>(`http://localhost:8089/user/api/v1/auth/getUsersSuggested/${userId}`);
}
}
