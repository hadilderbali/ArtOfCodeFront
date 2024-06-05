import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../Model/JobApplication';
import { ActivatedRoute, Router } from '@angular/router';
import { JobapplicationService } from '../services/jobapplication.service';

@Component({
  selector: 'app-update-job-application',
  templateUrl: './update-job-application.component.html',
  styleUrls: ['./update-job-application.component.css']
})
export class UpdateJobApplicationComponent implements OnInit {
  jobId!: number;
  jobApplication: JobApplication = new JobApplication(); 
  isEditMode: boolean = false;
  selectedFile: File | null = null; // Declare the selectedFile property here
  constructor(private route: ActivatedRoute, private jobAppService: JobapplicationService, private router: Router) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['idD'];
    this.loadJobApplication();
  }
  
  loadJobApplication() {
    this.jobAppService.getJobApp(this.jobId).subscribe(
      (jobApplication: any) => {
        this.jobApplication = jobApplication;
        this.isEditMode = true; // Set edit mode to true when job application data is loaded
      },
      (error) => {
        console.error('Error fetching job application data:', error);
      }
    );
  }
  onFileSelected(event: any) {
    // Update selectedFile property when a file is selected
    this.selectedFile = event.target.files[0];
  }
  updateJobApp(): void {
    this.jobAppService.updateJobApplicationWithoutImage(this.jobId, this.jobApplication).subscribe(
      () => {
        console.log('Job application updated successfully');
        this.router.navigate(['/listJobApp']);
      },
      (error) => {
        console.error('Error updating job application: ', error);
        // Handle error (e.g., display error message)
      }
    );
  }
  
  navigateToList() {
    this.router.navigate(['/listJobApp']);
  }
}
