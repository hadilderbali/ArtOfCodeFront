import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Comment } from 'src/app/models/comment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-tutorial-front',
  templateUrl: './view-tutorial-front.component.html',
  styleUrls: ['./view-tutorial-front.component.css'],
})
export class ViewTutorialFrontComponent implements OnInit {
  eventList: Tutorial[] = [];
  currentPage: number = 1;
  totalEvents: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;
  pages: number[] = [];

  categories!: any[];

  level: string = '';
  category: string = '';
  dateString = "2024,4,21,10,50,47";
  dateObject: Date;

  showComments: boolean = false;
showCommentForm: boolean = false;
showCommentsAndForm: boolean = false;
  tutorial: any;
  userId!: number; // Déclaration de la propriété userId avec l'assurance non nulle

  constructor(
    private router: Router,
    private tutorialService: TutorialService,private http: HttpClient
  ) {
    const dateParts = this.dateString.split(',').map(part => parseInt(part, 10));
    this.dateObject = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5]);
    this.userId = 1;
  }

  ngOnInit(): void {
    this.getEvents();
    this.tutorialService.getCategories().subscribe((data) => {
      this.categories = data;
    });
   
  }

  getEvents(): void {
    console.log(this.category);
    this.tutorialService
      .getEventsPaged(
        
        this.currentPage,
        this.pageSize,
        this.level == '' ? null : this.level,
        this.category == '' ? null : this.category,
      )
      .subscribe((response) => {
        this.eventList = response.content;
        this.totalEvents = response.totalElements;
        this.totalPages = response.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getEvents();
  }

  openModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  //like and dislike
  likeCount: number = 0; // Compteur de likes
  likediscount: number=0; //compteur de dislikes
  likeTutorial(tutorialId: number): void {
    const tutorial = this.eventList.find((event) => event.tutorialId === tutorialId);
    if (tutorial && !tutorial.liked) {
      this.tutorialService.likeTutorial(tutorialId).subscribe(
        () => {
          tutorial.likes++;
          tutorial.liked = true; // Marquer comme liké
          if (tutorial.disliked) {
            tutorial.dislikes--; // Réduire le dislike si l'utilisateur a déjà disliké
            tutorial.disliked = false;
          }
        },
        (error) => {
          console.error('Error liking tutorial:', error);
        }
      );
    }
  }
  
  dislikeTutorial(tutorialId: number): void {
    const tutorial = this.eventList.find((event) => event.tutorialId === tutorialId);
    if (tutorial && !tutorial.disliked) {
      this.tutorialService.dislikeTutorial(tutorialId).subscribe(
        () => {
          tutorial.dislikes++;
          tutorial.disliked = true; // Marquer comme disliké
          if (tutorial.liked) {
            tutorial.likes--; // Réduire le like si l'utilisateur a déjà liké
            tutorial.liked = false;
          }
        },
        (error) => {
          console.error('Error disliking tutorial:', error);
        }
      );
    }
  }
  
    // Récupérer les vidéos avec les commentaires
    newComment: Comment = { id: 0, tutorialId: 0, content: '', createdAt: new Date() };// Modèle pour le nouveau commentaire
    getEventsWithComments(): void {
      this.tutorialService.getEventsWithComments().subscribe(
        events => {
          this.eventList = events;
          this.eventList.forEach(event => {
            event.comments.forEach(comment => {
              comment.content = this.filterBadWords(comment.content); // Filtrer les commentaires
            });
          });
        },
        error => {
          console.error('Error fetching events with comments:', error);
        }
      );
    }
   // Ajouter un commentaire à une vidéo
   forbiddenWords: string[] = ['badword1', 'badword2', 'badword3'];
   isCommentValid(commentContent: string): boolean {
    const normalizedContent = commentContent.toLowerCase();
  
    // Liste des mots interdits
   
  
    return true; // Le commentaire est valide
  }
  

  // Méthode pour filtrer les mots interdits et remplacer par des étoiles
  filterBadWords(commentContent: string): string {
    const normalizedContent = commentContent.toLowerCase();

    // Remplacer les mots interdits par des étoiles
    for (const word of this.forbiddenWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Expression régulière pour le mot entier et non la partie du mot
      commentContent = commentContent.replace(regex, '*'.repeat(word.length));
    }

    return commentContent;
  }

 // Méthode pour ajouter un commentaire en filtrant les mots interdits
addComment(tutorialId: number): void {
  const filteredCommentContent = this.filterBadWords(this.newComment.content);

  const commentToAdd: Comment = {
    id: 0,
    tutorialId: tutorialId,
    
    content: filteredCommentContent,
    createdAt: new Date()
  };

  // Passer le commentaire créé au service pour l'ajout
  this.tutorialService.addComment(tutorialId, this.userId, commentToAdd).subscribe(
    (response: Comment) => {
      const event = this.eventList.find((event) => event.tutorialId === tutorialId);
      if (event) {
        event.comments.push(response);
      }
      this.newComment = { id: 0, tutorialId: 0, content: '', createdAt: new Date() };
    },
    (error) => {
      console.error('Error adding comment:', error);
      // Gérer les erreurs en cas de problème lors de l'ajout du commentaire
    }
  );
}

  
 //button comment 
toggleCommentsAndForm(): void {
  this.showCommentsAndForm = !this.showCommentsAndForm; // Inverser l'état des commentaires et du formulaire

  // Charger les commentaires si la section des commentaires est affichée
  if (this.showCommentsAndForm) {
    this.getEventsWithComments();
  }

  // Cacher le formulaire de commentaire si la section est masquée
  this.showCommentForm = this.showCommentsAndForm;
}

  
  cancelComment(): void {
    this.newComment = { id: 0, tutorialId: 0, content: '', createdAt: new Date() };
    this.showCommentForm = false;
  }
  
 
  //pagination
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getEvents();
  }



  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getEvents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getEvents();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getEvents();
    }

  }
  shareVideo(videoName: string) {
    const videoUrl = `assets/videos/${videoName}`;
    const encodedVideoUrl = encodeURIComponent(videoUrl);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://Invitaion.com/${videoUrl}`;
    window.open(facebookShareUrl, "_blank");
}


  
 // Méthode pour filtrer les mots interdits en temps réel lors de la saisie
 handleInputChange(event: Event): void {
  const target = event.target as HTMLTextAreaElement;
  const filteredContent = this.filterBadWords(target.value);
  this.newComment.content = filteredContent; // Mettre à jour le contenu filtré dans newComment.content
}

downloadVideo(videoName: string) {
  // Construire l'URL de la vidéo à télécharger
  const videoUrl = `assets/videos/${videoName}`;

  // Créer un lien temporaire pour le téléchargement
  const link = document.createElement('a');
  link.href = videoUrl;
  link.download = videoName;
  
  // Simuler un clic sur le lien pour déclencher le téléchargement
  document.body.appendChild(link);
  link.click();
  
  // Nettoyer après le téléchargement
  document.body.removeChild(link);
}








}

