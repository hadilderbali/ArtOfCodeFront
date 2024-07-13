import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Candidature } from 'src/app/candidature';
import { CandidatureService } from 'src/app/candidature.service';
import { Competition } from 'src/app/competition';
import { Grades } from 'src/app/grades';
import { GradesService } from 'src/app/grades.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-candidaturejuge-front',
  templateUrl: './candidaturejuge-front.component.html',
  styleUrls: ['./candidaturejuge-front.component.css']
})
export class CandidaturejugeFrontComponent implements OnInit {
  candidatureList: Candidature[] = [];
  candidatureListExpired: Candidature[] = [];
  gradess: Grades = new Grades();
  id!: number;
  userId1: number=57;
  userId2: number=1;
  competition!: Competition;
  grades: any[] = [];
  constructor(
    private notificationService: NotificationService,
    public candidatureservice: CandidatureService,
    public gradesservice: GradesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.grades = new Array(this.candidatureList.length);

    this.getcandidature();
  }

  onSubmit(id: number) {
    
    // Vérification de la valeur de candidacyGrade
    if (this.gradess.candidacyGrade < 0 || this.gradess.candidacyGrade > 100) {
      console.log('La valeur de candidacyGrade doit être comprise entre 0 et 100.');
      return; // Sortir de la fonction si la valeur n'est pas valide
    }
  
    console.log(this.gradess);
    this.gradesservice.addgrades(this.gradess, id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  

  getcandidature(): void {
    this.candidatureservice.getallcadidature().subscribe(
      (response: any) => {
        this.candidatureList = response;
        console.log(response)

        console.log(this.candidatureListExpired);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  sendNotifications(): void {
    this.notificationService.sendNotifications().subscribe(
      (response: any) => {
        console.log('Notifications envoyées avec succès !');
      },
      (error: any) => {
        console.error("Erreur lors de l'envoi des notifications :", error);
      }
    );
  }
}
