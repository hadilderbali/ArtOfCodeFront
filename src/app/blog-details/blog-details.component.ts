import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../Model/Blog';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http'
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog!: Blog // Initialize blog as null
  maxRating: number = 5;
currentRating: number = 0; // Initial rating
readOnly: boolean = true; 
rating: number = 0;
hovered: number | null = null;
selectedRatings: number[] = []; // Array to store selected ratings for each blog
project: any;
selectedRating:number=0
ratingSelected: boolean = false;
blogs: Blog[] = []; // Assuming you have a service to fetch the list of blogs
id:any
userId:number = 4;
private ratingSubscription!: Subscription;

constructor(private route: ActivatedRoute, private blogService: BlogService,private router:Router) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
    if (idParam) {
      const blogId = +idParam;
      this.getBlogDetails(blogId); 

      // Fetch blog details when component initializes
    } else {
      // Handle the case when 'id' parameter is not found
    }
  });

}
ngOnDestroy(): void {
  if (this.ratingSubscription) {
    this.ratingSubscription.unsubscribe();
  }
}
selectProductIndex=0;

getRating(blogId: number): void {
  // Assuming you have access to the user ID in your component
  const userId = this.userId; // Replace this with your actual way of getting the user ID

  this.ratingSubscription = this.blogService.getRatingByUserAndBlog(userId, blogId).subscribe(rating => {
    this.rating = rating;
  });
}



getBlogDetails(blogId: number): void {
  this.blogService.getBlog(blogId).subscribe(blog => {
    this.blog = blog; // Assign fetched blog data to the blog property
  });
}
calculateDuration(createdDate: Date | string): string {
  let parsedDate: Date;

  // Preprocess the createdDate string if it's a string
  if (typeof createdDate === 'string') {
    createdDate = this.preprocessDate(createdDate);
  }

  // Parse the createdDate
  parsedDate = new Date(createdDate);

  // Check if parsedDate is a valid Date object
  if (isNaN(parsedDate.getTime())) {
    console.error('Invalid createdDate:', createdDate);
    return 'Invalid Date';
  }

  // Convert parsedDate to UTC
  const parsedDateUTC = new Date(parsedDate.toUTCString());
  const now = new Date();
  // Convert current date to UTC
  const nowUTC = new Date(now.toUTCString());
  const difference = nowUTC.getTime() - parsedDateUTC.getTime();

  // Convert difference to seconds
  const seconds = Math.floor(difference / 1000);

  // Convert seconds to human-readable format
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}


preprocessDate(dateString: string): string {
  // Convert the date string to a format that JavaScript's Date constructor can parse
  // For example, replace slashes with hyphens
  return dateString.replace(/\//g, '-');
}
getBlogPhotoUrl(blogId: number): string {
  return this.blogService.getBlogPhoto(blogId);
}


async rateBlog(blogId: number, rating: number): Promise<void> {
  try {
    const response = await this.blogService.addRating(this.userId, blogId, rating).toPromise();
    console.log('Rating saved:', response);

    // Based on the response message
    if (response.message === 'Rating added successfully.') {
      window.alert('Rating saved successfully.');
      this.selectedRating = this.rating;
    } else if (response.message === 'You have already rated this blog.') {
      window.alert('You have already rated this blog.');
    } else {
      window.alert('Unexpected response: ' + response.message);
    }
  } catch (error) {
    console.error('Error saving rating:', error);

    if (error instanceof HttpErrorResponse) {
      // Based on the error status
      if (error.status === 409) { // HTTP Conflict
        window.alert('You have already rated this blog.');
      } else if (error.status === 400) { // HTTP Bad Request
        window.alert('User or blog not found.');
      } else {
        window.alert('Failed to save rating. Please try again.');
      }
    } else {
      // Handle any non-HTTP errors
      window.alert('An unexpected error occurred. Please try again.');
    }
  }
}

async submitRating(blogId: number): Promise<void> {
  if (this.rating === 0) {
    window.alert('Please select a rating.');
    return;
  }

  try {
    await this.rateBlog(blogId, this.rating);
    this.selectedRating = this.rating;
  } catch (error) {
    console.error('Error saving rating:', error);
  }
}
// Define a map to store the selected ratings for each cardS
SelectedRatings: { [key: number]: number } = {};

// Update the setRating method
setRating(rating: number): void {
  // Save the rating to the service and update the display
  this.blogService.setRating(this.blog.idBlog, rating);
  this.rating = rating; // Update the rating variable in the component
}


goBack(): void {
  // Navigate back to the view page
  this.router.navigate(['/Blogview']);
}


}
