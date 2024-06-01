import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { UserAuthService } from 'src/app/Services/user-auth.service'; // Import the UserAuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;
  error:string |undefined;
  id:any|undefined;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService, // Inject the UserAuthService
    private router:Router,
    
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('access_token'))
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setAuthenticationResponse(response);
        console.log("Login successful", response);
        // Decode token to extract profile
        this.userAuthService.getDataFromToken(response.access_token).subscribe(
          (decodedResponse: any) => {
            console.log("Decoded token", decodedResponse);
            const profile = decodedResponse.profile;
            const role=decodedResponse.role;
            this.id = decodedResponse.id;
            // Redirect based on profile
            if (role=="ADMIN"){
              this.router.navigate(['/admin'])
            }else{
            if (!profile) {
              // Profile is null, redirect to create profile page
              this.router.navigate(['/profile']);
            } else {
              // Profile exists, redirect to profile page
              this.router.navigate(['/']);
            }
          }},
          (error) => {
            console.log("Error decoding token", error);
            // Handle error decoding token
          }
        );
      },
      (error) => {
        console.log("Login failed", error.error.error);
        this.error = error.error.error;
        // Handle login failure, e.g., display error message to the user
      
      
      }
    );
  }
}
