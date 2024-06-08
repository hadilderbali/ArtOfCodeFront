import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../Model/JobApplication';
import { JobapplicationService } from '../Services/jobapplication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from '../Model/Page';
import { ProfileService } from '../Services/profile.service';
@Component({
  selector: 'app-list-job-application',
  templateUrl: './list-job-application.component.html',
  styleUrls: ['./list-job-application.component.css']
})
export class ListJobApplicationComponent implements OnInit {
  jobApplications: JobApplication[] = [];
  imageURL: { [key: string]: string } = {};
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  itemsPerPage = 3;
  isLoading = true;

  dancerId: number = 8; 
  constructor(private jobAppService: JobapplicationService ,private router: Router,private ProfileService:ProfileService) { }

  ngOnInit() {
    this.loadJobApplications();
  }

  private loadJobApplications(): void {
    this.isLoading = true;
    this.ProfileService.getDataFromToken(localStorage.getItem('access_token')).subscribe((response) => {
      this.jobAppService.getJobApplicationsByDancerId(response.id, this.currentPage, this.itemsPerPage)
      .subscribe(
          (page: Page<JobApplication>) => {
              this.jobApplications = page.content;
              this.totalPages = page.totalPages;
              this.isLoading = false;
              
              console.log(page.content)
              // Fetch and assign image data for each job application
              this.jobApplications.forEach(jobApp => {
                  this.getJobAppPhoto(jobApp.idDancer)
              });

              this.isLoading = false;
          },
          error => {
              // Handle errors
              console.error('Error loading job applications:', error);
              this.isLoading = false; // Set to false on error
          }
      );
    })
   
}

  goToPage(page: number) {
    this.currentPage = page;
    this.loadJobApplications();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadJobApplications();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadJobApplications();
    }
  }
  blogPhotoUrl: { [id: number]: string } = {};
  getJobAppPhoto(id: number) {
    this.jobAppService.getJobAppPhotoById(id).subscribe(
      url => {
        this.blogPhotoUrl[id] = url;
        console.log(url)
      },
      error => {
        console.error('Error fetching blog photo URL:', error);
      }
    );
  }
    generatePageNumbers(): number[] {
      return Array(this.totalPages).fill(0).map((x, i) => i);
    }
  updateJobApp(idD: number) {
    console.log('idD:', idD); // Check the value of idD

    this.router.navigate(['/updateJobApp', idD]);
  }
  deleteJobApp(id: number):void{
    this.jobAppService.deleteJobApp(id).subscribe(
      () => {
        // If successful, update the list by removing the deleted job application
        this.jobApplications = this.jobApplications.filter(jobApp => jobApp.idDancer !== id);
        // Optionally, display a success message
        console.log('Job application deleted successfully.');
      },
      error => {
        // Handle errors
        console.error('Error deleting job application:', error);
        // Optionally, display an error message
      }
    );
  }
  goToDetailView(): void {
    // Navigate to the detail view component when the button is clicked
    this.router.navigateByUrl('/view');
}

  }


