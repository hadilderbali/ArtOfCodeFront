import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {
  usernameInput: string = '';
  suggestedUsers: any[] = [];
  suggestUsersImages: { [key: string]: string } = {}; // Store user images by user ID

  constructor(private http: HttpClient, private router: Router) {
    
   }

  async handleUsernameInputChange(event: any): Promise<void> {
    this.usernameInput = event.target.value;
    if (this.usernameInput.length > 0) {
      try {
        const users = await this.http.get<any[]>(
          `http://localhost:8089/user/api/v1/auth/getUserByUsername?start=${this.usernameInput}`
        ).toPromise();
        console.log(users);
        if (users) {
          this.suggestedUsers = users;
          this.suggestedUsers.forEach(user => {
            this.getProfilephoto(user); // Call getProfilephoto for each user
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      this.suggestedUsers = [];
    }
  }
  getProfilephoto(user: any): void {
    const id = user.id;
    this.http.get(`http://localhost:8089/user/api/v1/auth/profile/profileimageid/${id}`, { responseType: 'blob' })
      .subscribe((data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.suggestUsersImages[id] = reader.result as string; // Store image URL for user ID
        };
        reader.readAsDataURL(data);
      });
  }

  clickUser(user: any): void {
    console.log(user);
    this.router.navigate([`/myprofile/${user.id}`]);
  }
}
