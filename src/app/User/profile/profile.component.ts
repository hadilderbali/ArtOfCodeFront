import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { Router } from '@angular/router';
import { Profile, dancepref, musicpref} from './Profile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isMusicSelected: any;
  userEmail: string | undefined;
  currentStep: number = 0;
  steps: string[] = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7', 'Step 8', 'Step 9'];
  progressWidth: number = 0;
  profile: Profile = {
    musicPrefInput: musicpref.CLASSICAL,
    dancePrefInput: dancepref.HIP_HOP,
   
  };

  musicGenres = Object.values(musicpref);
  danceGenres = Object.values(dancepref);
 
  selectedFile: File | undefined;
  previewImageUrl: string | ArrayBuffer | null = null;
  
  aboutMeInput: string | undefined;
  phoneNumber: any;
  githubLink: any;
  address: any;
  facebookLink: any;
  instagramLink: any;
  phoneNumberInput: any;
  addressInput: any;
  githubLinkInput: any;
  facebookLinkInput: any;
  instagramLinkInput: any;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('access_token');
    console.log(token);
    this.profileService.getDataFromToken(token).subscribe(response => {
      console.log(response);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.selectedFile || !this.musicGenres || !this.danceGenres || !this.aboutMeInput 
     
      
      ) {
      return; // Validation failed
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('musicpref', this.profile.musicPrefInput);
    formData.append('dancepref', this.profile.dancePrefInput);
   
    formData.append('aboutMe', this.aboutMeInput);
    formData.append('phonenumber', this.phoneNumberInput);
    formData.append('address', this.addressInput);
    formData.append('githublink', this.githubLinkInput);
    formData.append('facebooklink', this.facebookLinkInput);
    formData.append('instagramlink', this.instagramLinkInput);

    this.profileService.addProfile(formData).subscribe(
      response => {
        console.log('Profile added successfully:', response);
        // Reset form fields and preview image
        this.resetForm();
        // Redirect to desired route
        this.router.navigate(['/']); // Adjust the route path as per your application's routing setup
      },
      error => {
        console.error('Error adding profile:', error);
        // Handle error
      }
    );
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.progressWidth = ((this.currentStep + 1) / this.steps.length) * 100;
  }

  resetForm() {
    this.selectedFile = undefined;
    this.previewImageUrl = null;
    
    this.aboutMeInput = undefined;
  }

}
