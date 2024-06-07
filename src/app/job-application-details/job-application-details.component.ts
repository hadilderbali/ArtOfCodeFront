import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobapplicationService } from '../Services/jobapplication.service';
import { JobApplication } from '../Model/JobApplication';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-job-application-details',
  templateUrl: './job-application-details.component.html',
  styleUrls: ['./job-application-details.component.css']
})
export class JobApplicationDetailsComponent implements OnInit {
  jobOfferId: number | null = null; // Initialize jobId as null or with a default value
  jobApplication: JobApplication | null = null;
    imageUrl: string | null = null;

  constructor(private route: ActivatedRoute, public jobAppService: JobapplicationService,private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const jobOfferId = +idParam; // Assuming 'id' is the parameter name
        this.loadJobApplicationDetails(jobOfferId);
      } else {
        // Handle the case where the 'id' parameter is null
        console.error("Job offer ID parameter is null");
      }
    });
  }
  
  loadJobApplicationDetails(jobOfferId: number): void {
    this.jobAppService.getJobApplicationByJobOfferId(jobOfferId).subscribe(jobApp => {
      this.jobApplication = jobApp;
      const jobAppId = jobApp.idDancer; // Assuming idDancer is the job application ID
      this.jobAppService.getJobAppPhotoById(jobAppId).pipe(
        catchError(error => {
          console.error('Error fetching image data:', error);
          return of(null); // Return null if there's an error
        })
      ).subscribe(imageData => {
        if (imageData) {
          this.imageUrl = URL.createObjectURL(imageData);
        } else {
          // Handle the case where imageData is null
          console.error('Image data is null');
        }
      });
    });
  }
  

  acceptJobApplication(): void {
  if (this.jobApplication) {
    const jobId = this.jobApplication.idDancer; 
    this.jobAppService.acceptJobApplication(jobId).subscribe(() => {
      // Update the status of the job application locally
      if (this.jobApplication) {
        this.jobApplication.status = true; 
        alert("Job application accepted successfully.");

      }
    });
  }
}

  
refuseJobApplication(): void {
  if (this.jobApplication) {
    const jobId = this.jobApplication.idDancer; 
    // Assuming you have a method in jobAppService to delete the job application
    this.jobAppService.deleteJobApp(jobId).subscribe(() => {
      // After successful deletion, you can clear the jobApplication object
      this.jobApplication = null;
      alert("Job application refused successfully.");
    });
  }
}
returnToList() {
  // Navigate back to the list view
  this.router.navigate(['/list']); // Adjust the route path as needed
}

}
