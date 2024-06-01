import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../competition.service';
import { Competition } from '../competition';

@Component({
  selector: 'app-updatecompetition',
  templateUrl: './updatecompetition.component.html',
  styleUrls: ['./updatecompetition.component.css']
})
export class UpdatecompetitionComponent {
  id!: number;
  competition: any = {};
  category: any[] = [];

  constructor(private _router: Router,
    public competitionservice: CompetitionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.competition = new Competition();
    if (this.id != -1) {
      this.competitionservice.getcompetitionbyid(this.id)
        .subscribe(
          data => this.competition = data
        )
    }
   
  }


  update() {
    this.competitionservice.updatecompetition(this.id, this.competition).subscribe(
      (response) => {
        console.log('Competition mise à jour avec succès :', response);
        this._router.navigate(['/competition-list']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'competition :', error);
      }
    );
  }
}
