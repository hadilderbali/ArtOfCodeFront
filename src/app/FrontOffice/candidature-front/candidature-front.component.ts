import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Candidature } from 'src/app/candidature';
import { CandidatureService } from 'src/app/candidature.service';

@Component({
  selector: 'app-candidature-front',
  templateUrl: './candidature-front.component.html',
  styleUrls: ['./candidature-front.component.css']
})
export class CandidatureFrontComponent {
  constructor(public candidatureservice: CandidatureService) { }
  candidatureList: Candidature[] = [];
candidature!:Candidature;
  ngOnInit(): void {

    this.getcandidature();
  }

  getcandidature(): void {
    this.candidatureservice.getcadidaturebyuser().subscribe(
      (response:any)=>{
        this.candidatureList=response;
        console.log(response);
      },
        (error:HttpErrorResponse)=>
        {
          alert(error.message);
        }
      );
    
  }


}
