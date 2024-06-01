import { Component, OnInit} from '@angular/core';
import { JobOffer } from 'src/app/Models/job-offer';
import { JobOfferService } from 'src/app/Services/job-offer.service';

@Component({
  selector: 'app-job-offer-list',
  templateUrl: './job-offer-list.component.html',
  styleUrls: ['./job-offer-list.component.css']
})

export class JobOfferListComponent implements OnInit {
joboffers: JobOffer[]=[]; 
constructor(private jobofferservice: JobOfferService){ }
ngOnInit(): void {
  this.getJobOffer();

    
}
private getJobOffer(){
  this.jobofferservice.getJobOffers().subscribe(data => {
    this.joboffers = data;
  })
}
}
