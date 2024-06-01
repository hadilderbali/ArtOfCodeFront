import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  model: any = {
    role: 'USER'
  };

  constructor(  private userService: UserService,
    private userAuthService: UserAuthService, // Inject the UserAuthService
    private router:Router) { }
  ngOnInit(): void {}
 
  register(loginForm: NgForm) {
    this.userService.register(loginForm.value).subscribe(
      (response: any) => {
        // Store authentication response in local storage using UserAuthService
        
      
          this.router.navigate(['/login'])
      
          
        
    
      
        // Handle login failure, e.g., display error message to the user
      }
    );
}
}
