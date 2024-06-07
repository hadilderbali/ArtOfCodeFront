import { Component } from '@angular/core';
import { JobOffer, Type } from '../Model/JobOffer';
import { JobService } from '../Services/job.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {
  newJobOffer: JobOffer = new JobOffer();
  jobTypes: string[] = Object.values(Type); // Get all values from the Type enum
  imgURL:any;
  userFile:any;
   imagePath:any;
   message!: string;
  jobOfferId!: number;
  successMessage: boolean = false;
  agreeTerms: boolean = false;
  recruiterId: number = 4; // Mock recruiter ID for testing
  private notificationSubscription: Subscription | undefined;

 
  constructor(private jobService: JobService,private router:Router) {}
  ngOnInit(): void {
    // Start checking for notifications when the component initializes
    this.startCheckingNotifications();
  }
  ngOnDestroy(): void {
    // Unsubscribe from notification checking when the component is destroyed
    this.stopCheckingNotifications();
  }

  stopCheckingNotifications(): void {
    // Unsubscribe from the notification subscription
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }


  startCheckingNotifications(): void {
    // Set an interval to check for notifications every 10 seconds
    this.notificationSubscription = timer(0, 10000).pipe(
      switchMap(() => this.jobService.checkForNotifications())
    ).subscribe(hasNotifications => {
      if (hasNotifications) {
        // Show an alert message to notify the user
        alert("You have new notifications!");
      }
    });
  }

  addJobOffer() {

    if (!this.agreeTerms) {
      alert("You must agree to the terms and conditions.");

      return;
    }
    const formData = new FormData();
  
    // Append form fields
    formData.append('title', this.newJobOffer.title);
    formData.append('location', this.newJobOffer.location);
    formData.append('number', this.newJobOffer.number.toString());
    formData.append('description', this.newJobOffer.description);
    formData.append('datePost', this.newJobOffer.datePost.toString());
    formData.append('email', this.newJobOffer.email);
    formData.append('salaryRange', this.newJobOffer.salaryRange.toString());
    formData.append('jobType', this.newJobOffer.jobType);

    
    // Append the image file
    formData.append('file', this.userFile);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };
    
    this.jobService.addJobOffer(formData,this.recruiterId).subscribe(data => {
      this.successMessage = true; // Show success message
      setTimeout(() => {
        this.router.navigate(['/list']);
      }, 2000); // 3000 milliseconds (3 seconds) delay before redirecting
    });
  }
  onSelectFile(event:any){
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     // this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     

  }
}
