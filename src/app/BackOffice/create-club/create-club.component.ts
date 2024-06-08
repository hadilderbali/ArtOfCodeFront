import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClubService } from 'src/app/Services/club.service';
import { HttpClient } from '@angular/common/http';
import { Club } from 'src/app/Models/club';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.css']
})
export class CreateClubComponent {
  newClub: Club = new Club();
  public message!: string;
  successMessage: boolean = false;
  agreeTerms: boolean = false;
  imgURL:any;
  public imagePath:any;
  clubId!: number;

     name:any;
      objective:any;
      president: any;
      fileName: any;



  constructor(private ClubService: ClubService,private router:Router,private http: HttpClient) {}

  createClub() {

    if (!this.agreeTerms) {
      alert("You must agree to the terms and conditions.");

      return;
    }
    const formData = new FormData();
  
    // Append form fields
    formData.append('name', this.newClub.name);
    formData.append('objective', this.newClub.objective);
    formData.append('president', this.newClub.president);
        
    // Append the image file
    formData.append('file', this.fileName);
  
    this.ClubService.createClub(formData).subscribe(data => {
      this.successMessage = true; // Show success message
      setTimeout(() => {
        this.router.navigate(['/club-back']);
      }, 2000); // 3000 milliseconds (3 seconds) delay before redirecting
    });
  }
  onSelectFile(event:any){
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.fileName = file;
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