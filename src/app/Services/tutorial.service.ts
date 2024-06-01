import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Tutorial } from '../models/tutorial';
import { Comment } from '../models/comment';
import { Level } from '../models/level';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private baseUrl: string = 'http://localhost:8081/api/tutorial/';
  private forbiddenWordsUrl: string = 'http://localhost:8081/api/tutorial/listbadword'; // Endpoint pour récupérer les mots interdits

  private forbiddenWords: string[] = []; // Liste de mots interdits récupérés depuis le backend

  constructor(private http: HttpClient) {
    this.loadForbiddenWords(); // Appeler la méthode pour charger les mots interdits au démarrage du service
  }
  private loadForbiddenWords(): void {
    this.http.get<any[]>(this.forbiddenWordsUrl).subscribe(
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
    return this.http.get<Tutorial[]>(this.baseUrl + 'getAllTutorials');
  }

  addtutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(this.baseUrl + 'addOrUpdate', tutorial);
  }

  deleteTutorial(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'delete/' + id);
  }

  filterTutorialsByLevel(level: string): Observable<Tutorial[]> {
    const params = new HttpParams().set('level', level);
    return this.http.get<Tutorial[]>(`${this.baseUrl}/filterByLevel`, {
      params,
    });
  }

  getTutorialById(tutorialIdt: number): Observable<Tutorial> {
    return this.http.get<Tutorial>(
      this.baseUrl + 'getTutorialById/' + tutorialIdt
    );
  }
  public updatetutorial(id: number, tutorial: Tutorial): Observable<Tutorial> {
    return this.http.put<Tutorial>(
      `${this.baseUrl}updateTutorial/${id}`,
      tutorial
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
    return this.http.get<any>(url);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/category/all`);
  }

  //like and dislike
 likeTutorial(tutorialId: number): Observable<any> {
  return this.http.post(`http://localhost:8081/api/tutorial/${tutorialId}/like`, {});
}


dislikeTutorial(tutorialId: number): Observable<any> {
  return this.http.post(`http://localhost:8081/api/tutorial/${tutorialId}/dislike`, {});
}
 //comments
 // Récupérer les vidéos avec les commentaires
 getEventsWithComments(): Observable<Tutorial[]> {
  return this.http.get<Tutorial[]>(`${this.baseUrl}/tutorial/getAllTutorialsWithComments`);
}

// Ajouter un commentaire à une vidéo
addComment(tutorialId: number, userId: number, comment: Comment): Observable<Comment> {
  const filteredContent = this.filterBadWords(comment.content);

  const commentToAdd: Comment = {
    ...comment,
    content: filteredContent
  };

  const url = `${this.baseUrl}${tutorialId}/comments/${userId}`;

  return this.http.post<Comment>(url, commentToAdd).pipe(
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
  return this.http.get<string>(`http://example.com/${tutorialId}/share`);
}

shareTutorial(tutorialId: number) {
  return this.http.get<string>(`http://localhost:8081/api/tutorial/${tutorialId}/share`);
}

getStatisticsByLevel(): Observable<{ [key in Level]: number }> {
  return this.http.get<{ [key in Level]: number }>(this.baseUrl + 'statistics-by-level');
}
}
