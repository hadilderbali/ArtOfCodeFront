import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../Model/JobOffer';
import { JobService } from '../Services/job.service';
import { Router } from '@angular/router';
import { Page } from '../Model/Page';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit{
   jobOffers: JobOffer[] = [];
  currentPage = 0;
  totalPages = 0;
  itemsPerPage = 3; // Adjust this value as needed
  isLoading = true;
  totalItems = 0;
  userId!: number ;

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit() {
    this.userId = 4
    this.getJobOffers();
  }

  private getJobOffers() {
    this.isLoading = true;
    this.jobService.getJobOffersByUserId(this.userId, this.currentPage, this.itemsPerPage).subscribe(
      (page: Page<JobOffer>) => {
        this.jobOffers = page.content;
        this.totalPages = page.totalPages;
        this.totalItems = page.totalElements;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading job offers:', error);
        this.isLoading = false;
      }
    );
  }

  // Pagination methods.
  

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getJobOffers();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getJobOffers();
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 0 && pageNumber < this.totalPages) {
      this.currentPage = pageNumber;
      this.getJobOffers();
    }
  }
  updateJobOffer(idR: number) {
    this.router.navigate(['updateJobOffer', idR]);
  }
  deleteJob(idR: number) {
    this.jobService.deletjob(idR).subscribe(
      data => {
        console.log('Job deleted successfully:', data);
        this.getJobOffers(); // Refresh the job list after deletion
      },
      error => {
        console.error('Error deleting job:', error);
      }
    );
  }
  generatePageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
  navigateToAddjob() {
    this.router.navigate(['/add']);
  }
  getJobOfferPhoto(idR: number): string {
    return this.jobService.getJobOfferPhoto(idR);
  }
  showJobApplication(jobOfferId: number): void {
    // Redirect to the job application page with the job offer ID as a parameter
    this.router.navigate(['/details', jobOfferId]);
  } 
   navigateToJobApplications(){
    
  }
  showDetailsMap: { [key: number]: boolean } = {};

  // Other properties and methods...

  toggleDetails(jobOfferId: number) {
    // Toggle the visibility state for the corresponding job offer
    this.showDetailsMap[jobOfferId] = !this.showDetailsMap[jobOfferId];
  }

  // Method to check if details should be shown for a specific job offer
  isDetailsVisible(jobOfferId: number): boolean {
    return this.showDetailsMap[jobOfferId];
  }
}
