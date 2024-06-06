import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../Model/Blog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rating } from '../Model/Rating';
import { Page } from '../Model/Page';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl ='http://localhost:8089/user';
  constructor(private httpclient: HttpClient) {}

  addBlog(blog: FormData, adminId: number): Observable<any> {
    // Append the adminId to the URL query parameters
    const url = `${this.baseUrl}/blog/addBlog?adminId=${adminId}`;

    // Make the POST request with the blog data
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('access_token')}`
        );

    return this.httpclient.post<any>(url, blog, { headers });
  }
  updateBlog(id: number, updatedBlog: Blog): Observable<any> {
    return this.httpclient.put<any>(`${this.baseUrl}/blog/${id}`, updatedBlog);
  }
  getBlog(id: number): Observable<Blog> {
    return this.httpclient.get<Blog>(`${this.baseUrl}/blog/get/${id}`);
  }
 

  getBlogs(page: number, size: number): Observable<Page<Blog>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpclient.get<Page<Blog>>(`${this.baseUrl}/blog/getblogs`, { params });
  }

  deleteBlog(id: number): Observable<any> {
    return this.httpclient.delete<any>(`${this.baseUrl}/blog/delete/${id}`);
  }
  getBlogPhoto(blogId: number): string {
    return `${this.baseUrl}/blog/ImgBlog/${blogId}`;
  }

  addRating(userId: number, blogId: number, rating: number): Observable<any> {
    // Make the POST request with the user ID, blog ID, and rating
    return this.httpclient.post<any>(`http://localhost:8082/api/Rating/add/${userId}/${blogId}/${rating}`, null);
  }
  getRatingsByBlogId(blogId: number): Observable<Rating[]> {
    return this.httpclient.get<Rating[]>(`${this.baseUrl}/blog/${blogId}`);
  }
  getRatingByUserAndBlog(userId: number, blogId: number): Observable<any> {
    // Make the GET request with the user ID and blog ID as query parameters
    return this.httpclient.get<any>(`http://localhost:8082/api/Rating/getpro/${userId}/${blogId}`);
  }
  
  
  private ratingKeyPrefix = 'Rating_';
  private ratingSubjects: { [ratingId: number]: BehaviorSubject<number> } = {};
  
  private getRatingKey(ratingId: number): string {
    return this.ratingKeyPrefix + ratingId;
  }
  
  private initRating(ratingId: number): void {
    const ratingKey = this.getRatingKey(ratingId);
    const storedRating = localStorage.getItem(ratingKey);
    const initialRating = storedRating ? parseInt(storedRating, 10) : 0;
    this.ratingSubjects[ratingId] = new BehaviorSubject<number>(initialRating);
  }
  
  setRating(ratingId: number, rating: number): void {
    const ratingKey = this.getRatingKey(ratingId);
    localStorage.setItem(ratingKey, rating.toString());
    if (!this.ratingSubjects[ratingId]) {
      this.initRating(ratingId);
    }
    this.ratingSubjects[ratingId].next(rating);
  }
  


   // Method to search blogs by title with pagination
   searchByQueryAndCategory(query: string, category: string, size: number, page: number): Observable<Page<Blog>> {
    let params = new HttpParams()
      .set('query', query)
      .set('category', category)
      .set('size', size.toString())
      .set('page', page.toString());

    return this.httpclient.get<Page<Blog>>(`${this.baseUrl}/blog/search`, { params: params });
  }
  getOverallRating(blogId: number): Observable<number> {
    const url = `${this.baseUrl}/Rating/overall/${blogId}`;
    return this.httpclient.get<number>(url);
  }

  getAverageRatingPerCategory(): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/average`);
  }

  getTotalNumberOfRatingsPerCategory(): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/total`);
  }

  getHighestRatedBlogPerCategory(): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/highest`);
  }

  getLowestRatedBlogPerCategory(): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/lowest`);
  }
}



