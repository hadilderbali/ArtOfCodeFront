import { Component, OnInit } from '@angular/core';
import { Competition } from '../competition';
import { CompetitionService } from '../competition.service';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent {
  category: any[] = [];

onSubmit() {
console.log(this.competition)
this.competitionService.addCompetition(this.competition).subscribe( data =>{
  console.log(data);
  this.goToCompetitionList();
},
error => console.log(error));}
  competition: Competition=new Competition();

  constructor(private categoryservice: CategoryService,private competitionService: CompetitionService, private router: Router) {}
  ngOnInit():void {
    this.categoryservice.getcategorybyid().subscribe(
      (category: any) => {
        this.category = category;
      },
      error => {
        console.error(error);
      }
    );
  }
  
  goToCompetitionList(){
    this.router.navigate(['/competition-list']);
  }
}
