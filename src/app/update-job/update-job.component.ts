import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../Model/JobOffer';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../Services/job.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit{
  jobId!: number;
  jobOffer: JobOffer = new JobOffer();
  isEditMode: boolean = false;
  currentImgURL: string = ''; // Variable for the current image URL
  newImgFile: any;
  newImgPreview:any; 
  message!:string;

  constructor(private route: ActivatedRoute,private datePipe: DatePipe, private jobService: JobService, private router: Router) { 
  }
  

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['idR'];
    this.formatDate;
    this.loadJobOffer();
   
  }
  

  loadJobOffer() {
    this.jobService.getJobOffer(this.jobId).subscribe(
      (jobOffer: JobOffer) => {
        this.jobOffer = jobOffer;
        this.currentImgURL = this.getJobOfferPhoto(this.jobId);
        this.isEditMode = true; // Set edit mode to true when job offer data is loaded
      },
      (error) => {
        console.error('Error fetching job offer data:', error);
      }
    );
  }
 
    
    
  
  updateJobOffer(): void {
    this.jobService.updateJobOfferWithoutFile(this.jobId, this.jobOffer).subscribe(
      () => {
        console.log('Job offer updated successfully without modifying the file');
        this.router.navigate(['/list']);
      },
      (error) => {
        console.error('Error updating job offer: ', error);
        // Handle error (e.g., display error message)
      }
    );
  }
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newImgFile = file;

      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
    }
  }}

  navigateToList() {
    this.router.navigate(['/list']);
  }
   formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSSZ')!;
  }
  getJobOfferPhoto(idR: number): string {
    return this.jobService.getJobOfferPhoto(idR); // Assuming you have a method in your job service to fetch the image URL based on the job ID
  }
 
}
