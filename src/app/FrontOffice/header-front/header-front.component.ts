import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;
  error:string |undefined;
  id:any|undefined;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService, // Inject the UserAuthService
    private router:Router,
    
  ) { }
  logout(){
    console.log("logout")
    localStorage.removeItem('access_token')
    this.router.navigate(["/login"])
  }

  ngOnInit(): void {
 
    
    let token = localStorage.getItem('access_token');
    console.log(token);
    this.userAuthService.getDataFromToken(token).subscribe(response => {
      console.log("user from token",response);
this.id=response.id;
      // Extract first name, last name, and profile data from the response
  
    });
  }}
