import { Component } from '@angular/core';
import { CandidatureService } from '../candidature.service';
import { Candidature } from '../candidature';
import { ActivatedRoute } from '@angular/router'; // Importer ActivatedRoute

@Component({
  selector: 'app-updatecandidacy',
  templateUrl: './updatecandidacy.component.html',
  styleUrls: ['./updatecandidacy.component.css']
})
export class UpdatecandidacyComponent {
  candidature: Candidature = new Candidature(); // Initialisation d'une instance de Candidature
  id: number;
  competition: Candidature=new Candidature();

  constructor(private candidatureService: CandidatureService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']; // Récupérer l'ID de l'URL
  }
 
  updateCandidacy(): void {
    // Vérifier si la vidéo n'est pas vide
    if (this.competition.video) {
        this.candidatureService.updateCompetitionCandidacy(this.competition, this.id)
            .subscribe(
                response => {
                    // Gérer la réponse de l'API si nécessaire
                    console.log('Mise à jour réussie :', response);
                },
                error => {
                    // Gérer les erreurs si nécessaire
                    console.error('Erreur lors de la mise à jour :', error);
                }
            );
    } else {
        alert('The video is empty, please check again.');
    }
    this.showPopup();

}
showPopup() {
  alert('Update successful!');
}
}
