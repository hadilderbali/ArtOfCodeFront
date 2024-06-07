import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Model/Blog';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blog!: Blog;
  maxRating: number = 5;
  currentRating: number = 0;
  readOnly: boolean = true;
  rating: number = 0;
  hovered: number | null = null;
  selectedRatings: number[] = [];
  selectedRating: number = 0;
  ratingSelected: boolean = false;
  userId: number = 4;
  private ratingSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const blogId = +idParam;
        this.getBlogDetails(blogId);
        this.getRating(blogId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ratingSubscription) {
      this.ratingSubscription.unsubscribe();
    }
  }

  getRating(blogId: number): void {
    this.ratingSubscription = this.blogService.getRatingByUserAndBlog(this.userId, blogId)
      .subscribe(rating => {
        this.rating = rating;
      });
  }

  getBlogDetails(blogId: number): void {
    this.blogService.getBlog(blogId).subscribe(blog => {
      this.blog = blog;
    });
  }

  calculateDuration(createdDate: Date | string): string {
    let parsedDate: Date;
    if (typeof createdDate === 'string') {
      createdDate = this.preprocessDate(createdDate);
    }
    parsedDate = new Date(createdDate);
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid createdDate:', createdDate);
      return 'Invalid Date';
    }
    const parsedDateUTC = new Date(parsedDate.toUTCString());
    const now = new Date();
    const nowUTC = new Date(now.toUTCString());
    const difference = nowUTC.getTime() - parsedDateUTC.getTime();
    const seconds = Math.floor(difference / 1000);
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
    return dateString.replace(/\//g, '-');
  }

  getBlogPhotoUrl(blogId: number): string{
    return this.blogService.getBlogPhoto(blogId);
  }

  async rateBlog(blogId: number, rating: number): Promise<void> {
    try {
      const response = await this.blogService.addRating(this.userId, blogId, rating).toPromise();
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
        if (error.status === 409) {
          window.alert('You have already rated this blog.');
        } else if (error.status === 400) {
          window.alert('User or blog not found.');
        } else {
          window.alert('Failed to save rating. Please try again.');
        }
      } else {
        window.alert('An unexpected error occurred. Please try again.');
      }
    }
  }

  async submitRating(blogId: number): Promise<void> {
    if (this.rating === 0) {
      window.alert('Please select a rating.');
      return;
    }
    await this.rateBlog(blogId, this.rating);
    this.selectedRating = this.rating;
  }

  setRating(rating: number): void {
    this.blogService.setRating(this.blog.idBlog, rating);
    this.rating = rating;
  }

  goBack(): void {
    this.router.navigate(['/Blogview']);
  }
}
