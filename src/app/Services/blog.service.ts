import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../Model/Blog';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Rating } from '../Model/Rating';
import { Page } from '../Model/Page';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl ='http://192.168.33.10:8089/user';
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
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.put<any>(`${this.baseUrl}/blog/${id}`, updatedBlog,{headers});
  }
  getBlog(id: number): Observable<Blog> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.get<Blog>(`${this.baseUrl}/blog/get/${id}`,{headers});
  }
 

  getBlogs(page: number, size: number): Observable<Page<Blog>> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpclient.get<Page<Blog>>(`${this.baseUrl}/blog/getblogs`, { params ,headers});
  }

  deleteBlog(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.delete<any>(`${this.baseUrl}/blog/delete/${id}`,{headers});
  }
  // getBlogPhoto(blogId: number): Observable<string> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${localStorage.getItem('access_token')}`
  //   );
  //   const url = `${this.baseUrl}/ImgBlog/${blogId}`;
  
  //   return this.httpclient.get(url, { headers, responseType: 'blob' }).pipe(
  //     map(blob => {
  //       const objectURL = URL.createObjectURL(blob);
  //       return objectURL;
  //     })
  //   );
  // }
  getBlogPhoto(blogId: number): Observable<string> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    const url = `${this.baseUrl}/blog/ImgBlog/${blogId}`;
    console.log(localStorage.getItem('access_token'));
    // Set responseType to 'blob' because the server is returning binary data
    const img =  this.httpclient.get(url, { headers, responseType: 'blob' }).pipe(
      map(blob => URL.createObjectURL(blob)) // Create a Blob URL from the Blob
    );
  
    img.subscribe(blobUrl => console.log(blobUrl)); // Log the actual Blob URL
  
    return img;
  }
  addRating(userId: number, blogId: number, rating: number): Observable<any> {
    // Make the POST request with the user ID, blog ID, and rating
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.post<any>(`http://localhost:8089/user/Rating/add/${userId}/${blogId}/${rating}`, null,{headers});
  }
  getRatingsByBlogId(blogId: number): Observable<Rating[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.get<Rating[]>(`${this.baseUrl}/blog/${blogId}`,{headers});
  }
  getRatingByUserAndBlog(userId: number, blogId: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    // Make the GET request with the user ID and blog ID as query parameters
    return this.httpclient.get<any>(`http://localhost:8089/user/Rating/getpro/${userId}/${blogId}`,{headers});
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
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token')}`
      );
    return this.httpclient.get<Page<Blog>>(`${this.baseUrl}/blog/search`, { params: params ,headers});
  }
  getOverallRating(blogId: number): Observable<number> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    const url = `${this.baseUrl}/Rating/overall/${blogId}`;
    return this.httpclient.get<number>(url,{headers});
  }

  getAverageRatingPerCategory(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/average`,{headers});
  }

  getTotalNumberOfRatingsPerCategory(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/total`,{headers});
  }

  getHighestRatedBlogPerCategory(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/highest`,{headers});
  }

  getLowestRatedBlogPerCategory(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
    return this.httpclient.get<any>(`${this.baseUrl}/Rating/lowest`,{headers});
  }
}



