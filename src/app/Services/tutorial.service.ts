import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Tutorial } from '../Models/tutorial';
import { Comment } from '../Models/comment';
import { Level } from '../Models/level';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private baseUrl: string = 'http://localhost:8089/user/api/v1/tutorial/';
  private forbiddenWordsUrl: string = 'http://localhost:8089/api/v1/tutorial/listbadword'; // Endpoint pour récupérer les mots interdits
  private forbiddenWords: string[] = []; // Liste de mots interdits récupérés depuis le backend
  constructor(private http: HttpClient) {
    
    this.loadForbiddenWords(); // Appeler la méthode pour charger les mots interdits au démarrage du service
  }
  private loadForbiddenWords(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    this.http.get<any[]>(this.forbiddenWordsUrl,{headers}).subscribe(
      response => {
        if (Array.isArray(response)) {
          this.forbiddenWords = response.map(item => (item.badWord || '').toLowerCase());
        } else {
          console.error('Invalid response format for forbidden words.');
        }
      },
      error => {
        console.error('Error fetching forbidden words:', error);
      }
    );
  }
  
  

  getAllTutorials(): Observable<Tutorial[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.get<Tutorial[]>(this.baseUrl + 'getAllTutorials',{headers});
  }
  addtutorial(tutorial: Tutorial): Observable<Tutorial> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    console.log(localStorage.getItem("access_token"))
    return this.http.post<Tutorial>(this.baseUrl + 'addOrUpdate',tutorial,{headers});
  }


  deleteTutorial(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.delete<void>(this.baseUrl + 'delete/' + id,{headers});
  }

  filterTutorialsByLevel(level: string): Observable<Tutorial[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    const params = new HttpParams().set('level', level);
    return this.http.get<Tutorial[]>(`${this.baseUrl}/filterByLevel`, {
      params,headers
    });
  }

  getTutorialById(tutorialIdt: number): Observable<Tutorial> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<Tutorial>(
      this.baseUrl + 'getTutorialById/' + tutorialIdt,{headers}
    );
  }
  public updatetutorial(id: number, tutorial: Tutorial): Observable<Tutorial> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
    return this.http.put<Tutorial>(
      `${this.baseUrl}updateTutorial/${id}`,
      tutorial,{headers}
    );
  }

  getEventsPaged(
    page: number,
    pageSize: number,
    level: null | string,
    category: null | string
  ): Observable<any> {
    let options: string = `?page=${page}&pageSize=${pageSize}`;
    if (!!level) options += `&level=${level}`;
    if (!!category) options += `&categoryId=${category}`;
    const url = `${this.baseUrl}pagedd${options}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<any>(url,{headers});
  }

  getCategories(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

    return this.http.get<any[]>(`http://localhost:8081/api/category/all`,{headers});
  }

  //like and dislike
 likeTutorial(tutorialId: number): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

  return this.http.post(`http://localhost:8081/api/tutorial/${tutorialId}/like`, {headers});
}


dislikeTutorial(tutorialId: number): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

  return this.http.post(`http://localhost:8081/api/tutorial/${tutorialId}/dislike`, {headers});
}
 //comments
 // Récupérer les vidéos avec les commentaires
 getEventsWithComments(): Observable<Tutorial[]> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
  return this.http.get<Tutorial[]>(`${this.baseUrl}/tutorial/getAllTutorialsWithComments`,{headers});
}

// Ajouter un commentaire à une vidéo
addComment(tutorialId: number, userId: number, comment: Comment): Observable<Comment> {
  const filteredContent = this.filterBadWords(comment.content);

  const commentToAdd: Comment = {
    ...comment,
    content: filteredContent
  };

  const url = `${this.baseUrl}${tutorialId}/comments/${userId}`;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

  return this.http.post<Comment>(url, commentToAdd,{headers}).pipe(
    catchError(error => {
      console.error('Error adding comment:', error);
      return throwError('Failed to add comment.');
    })
  );
}

private filterBadWords(content: string): string {
  if (!content) {
    return '';
  }

  let filteredContent = content;
  this.forbiddenWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredContent = filteredContent.replace(regex, '*'.repeat(word.length));
  });

  return filteredContent;
}

generateSharedLink(tutorialId: number): Observable<string> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

  return this.http.get<string>(`http://example.com/${tutorialId}/share`,{headers});
}

shareTutorial(tutorialId: number) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);
  return this.http.get<string>(`http://localhost:8081/api/tutorial/${tutorialId}/share`,{headers});
}

getStatisticsByLevel(): Observable<{ [key in Level]: number }> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem("access_token") }`);

  return this.http.get<{ [key in Level]: number }>(this.baseUrl + 'statistics-by-level',{headers});
}
}
