import { Component } from '@angular/core';
import { JobApplication } from '../Model/JobApplication';
import { JobapplicationService } from '../Services/jobapplication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffer } from '../Model/JobOffer';
import { JobService } from '../Services/job.service';
import { ProfileService } from '../Services/profile.service';
@Component({
  selector: 'app-add-job-application',
  templateUrl: './add-job-application.component.html',
  styleUrls: ['./add-job-application.component.css']
})
export class AddJobApplicationComponent {
newJobApp:JobApplication = new JobApplication();
userFile: any;
message!: string;
idJobOffer!: number;
jobOffer: JobOffer = new JobOffer();
successMessageVisible: boolean = false; 
agreeTerms: boolean = false;
dancerId: number = 0; // Add dancerId property
imgURL:any;
imagePath:any;

constructor(private jobApplicationService:JobapplicationService,private jobservice:JobService,private router:Router,    private route: ActivatedRoute,private ProfileService:ProfileService ){
}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.idJobOffer = +params['idR']; // Extract idJobOffer from route parameters
    console.log('idJobOffer:', this.idJobOffer); // Log idJobOffer value
    this.getJobOfferById(this.idJobOffer); // Fetch job offer details using idJobOffer
    this.dancerId = 1;
  });
}

getJobOfferById(id: number): void {
  this.jobservice.getJobOffer(id).subscribe(jobOffer => {
    this.jobOffer = jobOffer;
  });
}
addJobApp() {
  if (!this.agreeTerms) {
    alert("You must agree to the terms and conditions.");

    return;
  }
  const formData = new FormData();
  
  // Append form fields
  formData.append('idJobOffer', this.idJobOffer.toString()); // Pass idJobOffer as part of the form data
  formData.append('nameD', this.newJobApp.nameD);
  formData.append('emailDancer', this.newJobApp.emailDancer);
  formData.append('phoneNumberDancer', this.newJobApp.phoneNumberDancer.toString());
  formData.append('coverLetter', this.newJobApp.coverLetter);
  formData.append('file', this.userFile);
  console.log('Form Data:', formData);
  this.ProfileService.getDataFromToken(localStorage.getItem("access_token")).subscribe(response => {
    console.log(response.id);
    this.jobApplicationService.addJobApplication(formData,this.idJobOffer,response.id).subscribe(data => {
      this.successMessageVisible = true; // Show success message
      console.log('Form Data:', formData);
      setTimeout(() => {
        this.router.navigate(['/listJobApp']);
      }, 3000); // 3000 milliseconds (3 seconds) delay before redirecting
    });
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