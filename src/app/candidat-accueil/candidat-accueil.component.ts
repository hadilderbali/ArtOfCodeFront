import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NotificationService } from '../notification.service';
import { Notification } from '../notification';

@Component({
  selector: 'app-candidat-accueil',
  templateUrl: './candidat-accueil.component.html',
  styleUrls: ['./candidat-accueil.component.css']
})
export class CandidatAccueilComponent implements OnInit {
  userId: number = 1;
  user: User | undefined;
  notifications: Notification[] = [];
  notificationVisible: boolean = false; 
  notificationCount: number = 0;

  constructor(private userService: NotificationService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUserById(this.userId)
      .subscribe(user => {
        this.user = user;
        console.log('User:', this.user);
      });
  }

  getUserNotifications(): void {
    this.userService.getUserNotifications(this.userId)
      .subscribe(
        (notifications: any[]) => {
          this.notifications = notifications;
          console.log('Notifications:', this.notifications);
          this.notificationCount = this.notifications.length; // Met à jour le nombre de notifications
        },
        (error: any) => {
          console.error("Erreur lors du chargement des notifications de l'utilisateur :", error);
        }
      );
  } 

  showNotificationAlert(): void {
    this.notificationVisible = !this.notificationVisible; // Inverse l'état de la variable
    if (this.notificationVisible) {
      this.getUserNotifications(); // Charge les notifications lorsque la variable est true
    }
  }
}
