import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import {  OnInit } from '@angular/core';

@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html',
  styleUrls: ['./showusers.component.css']
})
export class ShowUsersComponent implements OnInit {

  users: any[] = []; // Array to store fetched users

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers(); // Fetch users when component initializes
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data; // Assign fetched users to the users array
      },
      error => {
        console.error('Error fetching users:', error);
        // Handle error as per your requirement
      }
    );
  }

}