import { Component, Input } from '@angular/core';
import { Candidature } from '../candidature';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-resultat-candidature',
  templateUrl: './resultat-candidature.component.html',
  styleUrls: ['./resultat-candidature.component.css']
})
export class ResultatCandidatureComponent {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications().subscribe(
      (response: any) => {
        this.notifications = response;
      },
      (error: any) => {
        console.error("Erreur lors du chargement des notifications :", error);
      }
    );
  }
}
