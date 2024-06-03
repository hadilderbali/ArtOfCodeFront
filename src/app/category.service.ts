import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL="http://localhost:8081/api/"

  constructor(private httpClient:HttpClient) { }
 
  
  public getcategorybyid(){
    console.log("test")
    return this.httpClient.get<Category>(`${this.baseURL}`+`category/all`)
  }
}
