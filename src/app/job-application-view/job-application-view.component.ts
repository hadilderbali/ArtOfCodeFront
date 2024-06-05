import { Component } from '@angular/core';
import { JobOffer } from '../Model/JobOffer';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { Page } from '../Model/Page';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-job-application-view',
  templateUrl: './job-application-view.component.html',
  styleUrls: ['./job-application-view.component.css']
})
export class JobApplicationViewComponent  {
  keyword: string = '';
  location: string = '';
  tempKeyword: string = '';
tempLocation: string = '';

  jobOffers: JobOffer[] = [];
  matchedJobOffers: JobOffer[] = [];
  nonMatchedJobOffers: JobOffer[] = [];
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  itemsPerPage = 3;
  isLoading = true;
  userId:number = 9;
  recruiterId:number =5;
  private unsubscribe$: Subject<void> = new Subject<void>();

constructor(private cookieService:CookieService ,public jobService: JobService, private router:Router){}
ngOnInit(): void {
  this.retrieveSearchCriteriaFromCookies(this.userId); // Retrieve search criteria from cookies

  // Set tempKeyword and tempLocation for display
  this.tempKeyword = this.keyword;
  this.tempLocation = this.location;

  this.onKeywordChange(this.keyword); // Trigger keyword change
  this.onLocationChange(this.location); // Trigger location change

  this.searchJobOffers(); 
  this.getJobOffers();
 // Subscribe to new job offers that match the criteria
 this.jobService.getNewJobOffers()
 .pipe(takeUntil(this.unsubscribe$))
 .subscribe((newJobOffer: JobOffer) => {
   // Check if the new job offer matches the criteria
   if (this.isJobOfferMatched(newJobOffer,this.location,this.keyword)) {
     // Add the new job offer to the list
     this.jobOffers.unshift(newJobOffer);
     // Show notification
     this.showNotification('New job offer added that matches your search criteria!');
   }
 });  

 
}
showNotification(message: string): void {
  // Implement notification display logic here
  alert(message);
}

ngOnDestroy(): void {
  // Unsubscribe from observables when the component is destroyed
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
retrieveSearchCriteriaFromCookies(userId: number): void {
  const storedKeyword = this.cookieService.get(`keyword_${userId}`);
  const storedLocation = this.cookieService.get(`location_${userId}`);
  console.log(storedKeyword)
  if (storedKeyword !== null && storedLocation !== null && storedLocation!==("") && storedKeyword!==(""))
 {
    this.keyword = storedKeyword;
    this.location = storedLocation;
    
  }
}


onKeywordChange(event: any) {
  const value = event?.target?.value; // Use optional chaining to handle null/undefined
  console.log('Keyword Change:', value);
  if (value !== undefined) {
    // Update component property
    this.tempKeyword = value;
    // Update corresponding cookie
    this.cookieService.set(`keyword_${this.userId}`, value);
  }
}

onLocationChange(event: any) {
  const value = event?.target?.value; // Use optional chaining to handle null/undefined
  console.log('Location Change:', value);
  if (value !== undefined) {
    // Update component property
    this.tempLocation = value;
    // Update corresponding cookie
    this.cookieService.set(`location_${this.userId}`, value);
  }
}
  public searchJobOffers(): void {
    this.isLoading = true;
    
    // Retrieve keyword and location from stored values
    const keyword = this.tempKeyword;
    const location = this.tempLocation;
    
    // Perform search if either keyword or location is not empty
    if (keyword || location) {
      console.log('Performing search...');

      this.jobService.searchJobOffers(keyword, location, this.currentPage, this.itemsPerPage)
      .subscribe(
        (page: Page<JobOffer>) => {
          this.jobOffers = page.content; // Set job offers based on search results
          this.totalPages = page.totalPages; // Update total pages
          this.totalItems = page.totalElements; // Update total items
          this.isLoading = false;
          // If the current page exceeds the total pages after search, reset to the first page
          if (this.currentPage >= this.totalPages) {
            this.currentPage = 0;
          }
         
          
          this.storeSearchCriteriaInCookies(this.userId); // Store search criteria in cookies
        },
        error => {
          console.error('Error loading job offers:', error);
          this.isLoading = false; // Set loading to false on error
        }
      );
  } else {
      console.log('Fields are empty, retrieving all job offers...');
      // Fields are empty, use getJobOffers method to retrieve all job offers
      this.getJobOffers();
  }
}
public getJobOffers(page: number = 0, size: number = 3): void {
  this.isLoading = true;
  
  // Retrieve keyword and location from cookies
  const keyword = this.cookieService.get(`keyword_${this.userId}`);
  const location = this.cookieService.get(`location_${this.userId}`);
  
  // Perform the request using the retrieved criteria
  this.jobService.getJobOffers(keyword, location, page, size)
    .subscribe(
      (page: Page<JobOffer>) => {
        this.jobOffers = page.content; // Set job offers retrieved from the backend
        this.totalPages = page.totalPages; // Update total pages
        this.totalItems = page.totalElements; // Update total items
        this.isLoading = false;
      },
      error => {
        console.error('Error loading job offers:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
}
 
  
getSearchCriteriaFromCookie(key: string): string {
  return this.cookieService.get(`${key}_${this.userId}`);
}




isJobOfferMatched(jobOffer: JobOffer, keyword: string, location: string): boolean {
  // Check if the title contains the search keyword and the location matches
  const titleMatches = jobOffer.title.toLowerCase().includes(keyword.toLowerCase());
  const locationMatches = jobOffer.location.toLowerCase() === location.toLowerCase();
  
  // Return true if both title and location match the search criteria
  return titleMatches && locationMatches;
}

goToPage(page: number) {
  this.currentPage = page;
  this.getJobOffers(this.currentPage, this.itemsPerPage);
}

nextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.getJobOffers(this.currentPage, this.itemsPerPage);
  }
}

prevPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.getJobOffers(this.currentPage, this.itemsPerPage);
  }
}
generatePageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i);
}
applyForJob(jobOffer: JobOffer): void {
  // Navigate to the job application submission page and pass any necessary data
  this.router.navigate(['/addJobApp', jobOffer.idR]);
}

viewJobApplications(): void {
  this.router.navigate(['/listJobApp']); // Navigate to the job applications page
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

  storeSearchCriteriaInCookies(userId: number): void {
  
    const keyword = this.tempKeyword;
    const location = this.tempLocation;
    // Store search criteria in cookies for the specified user
    this.cookieService.set(`keyword_${userId}`,  keyword || '' , { expires: 25, path: '/view', sameSite: 'Lax' });
    this.cookieService.set(`location_${userId}`,  location|| '', { expires: 30, path: '/view', sameSite: 'Lax' });
  }
 
}
