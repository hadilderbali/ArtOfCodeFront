import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Competition} from "src/app/competition"
import { CompetitionService } from 'src/app/competition.service'
@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {
  

  competitions! : Competition[];

  constructor(private competitionService :CompetitionService,public _router: Router,) {}

  ngOnInit(): void {
    this.getCompetitions();

  }
  
private getCompetitions(){
  this.competitionService.getAllCompetitions().subscribe(data => {
    this.competitions=data;

  })
}
delete(id: number) {
  console.log(`delete Supplier ${id}`);
  this.competitionService.DeleteCompetition(id).subscribe(
    response => {
      console.log(response);
      this.competitionService.getAllCompetitions().subscribe(
        response => {
          console.log(response);
          this.competitions = response;
        },
        error => {
          console.error('Erreur lors de la récupération des fournisseurs après suppression', error);
        }
      );
    },
    error => {
      console.error('Erreur lors de la suppression du fournisseur', error);
    }
  );
  window.location.reload();
}
update(id: number) {
    
  this._router.navigate(['/update-competition', id])
}
}
