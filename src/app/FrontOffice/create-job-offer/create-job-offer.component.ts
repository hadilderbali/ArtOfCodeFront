import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/Models/job-offer';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-job-offer',
  templateUrl: './create-job-offer.component.html',
  styleUrls: ['./create-job-offer.component.css']
})
export class CreateJobOfferComponent implements OnInit {
  joboffer : JobOffer = new JobOffer();
  constructor(private jobofferservice: JobOfferService,private router:Router){}
  ngOnInit(): void{
   
  }
  saveJob(){
    this.jobofferservice.addJobOffer(this.joboffer).subscribe ( data =>{
      console.log(data);
    }, 
    error=> console.log(error));
  
  }
  goToJobOfferList(){
    this.router.navigate(['/joboffers']);
  }
  onsubmit(){
    console.log(this.joboffer);
      this.saveJob();
  }

}
