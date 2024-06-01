import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidature } from 'src/app/candidature';
import { CandidatureService } from 'src/app/candidature.service';

@Component({
  selector: 'app-formulaire-competition-front',
  templateUrl: './formulaire-competition-front.component.html',
  styleUrls: ['./formulaire-competition-front.component.css']
})
export class FormulaireCompetitionFrontComponent {

  onSubmit() {
  console.log(this.competition)
  this.competitionService.addCandidature(this.competition,this.idcompetition).subscribe( data =>{
    console.log(data);
  },
  error => console.log(error));
this.goToCandidatureList();
}
    competition: Candidature=new Candidature();
    idcompetition!:number;
    iduser!:number;
    constructor(private competitionService: CandidatureService, private router: Router,private route: ActivatedRoute
      ) {}
    ngOnInit():void {
      this.idcompetition = this.route.snapshot.params['idcompetition'];

    }
    
    goToCandidatureList(){
      this.router.navigate(['/CandidatureUser']);
    }
}
