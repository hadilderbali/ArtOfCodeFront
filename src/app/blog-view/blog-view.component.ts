import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../Model/Blog';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import { CustomFilterPipe } from '../services/custom-filter-pipe.pipe';
import { Page } from '../Model/Page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent {
  categories: string[] = ['BALLET','HIPHOP','BALLROOM','SALSA','LATINA'];
  selectedCategory: string = '';

  blogs: Blog[] = []; // Assuming you have a service to fetch the list of blogs
blog!: Blog;
maxRating: number = 5;
currentRating: number = 0; // Initial rating
readOnly: boolean = true; 
rating: number = 0;
hovered: number | null = null;
selectedRatings: number[] = []; // Array to store selected ratings for each blog
currentPage = 0;
  totalPages = 0;
  pageSize = 3; // Number of blogs per page
  searchQuery = '';
  category: string = '';
  filteredBlogs: Blog[] = [];
  selectedBlogId: number | null = null; // Variable to store the selected blog ID
  selectedRating: number | null = null; // Variabl
// In your component class definition
overallRatings: { [blogId: number]: number } = {};

  constructor(public blogService: BlogService,private datePipe:DatePipe,private customFilterPipe:CustomFilterPipe,private router:Router) { }
  id:any;
  ngOnInit(): void {
  this.blogService.getBlogs(this.currentPage, this.pageSize)
    .subscribe((page: Page<Blog>) => {
      this.blogs = page.content;
      this.totalPages = page.totalPages;

      // Apply filter if search query exists
      if (this.searchQuery.trim() !== '') {
        this.filteredBlogs = this.customFilterPipe.transform(this.blogs, this.searchQuery);
      } else {
        this.filteredBlogs = this.blogs;
      }
      this.calculateRatings();
    });
 
  }

 
loadBlogs(): void {
  // Check if there's a search query
  if (this.searchQuery.trim() !== '') {
    // Filter the blogs locally based on the search query
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      blog.blogCategory.toLowerCase().includes(this.searchQuery.toLowerCase())    );
    this.totalPages = 1; // Since the filtered result is not paginated
    if (this.filteredBlogs.length === 0) {
      alert('No blogs found.');
    }
  } else {
    // If there's no search query, fetch paginated blogs
    this.blogService.getBlogs(this.currentPage, this.pageSize)
      .subscribe((page: Page<Blog>) => {
        this.blogs = page.content;
        this.totalPages = page.totalPages;
        this.filteredBlogs = this.blogs; // Initially, show all blogs
          this.calculateRatings(); // Calculate ratings for each blog
      });
  }
}


calculateRatings(): void {
  const ratingObservables = this.filteredBlogs.map(blog =>
    this.blogService.getOverallRating(blog.idBlog)
  );

  forkJoin(ratingObservables).subscribe(ratings => {
    ratings.forEach((rating, index) => {
      this.overallRatings[this.filteredBlogs[index].idBlog] = rating;
    });
  });
}



getStars(grade: number): string[] {
  const fullStars = Math.floor(grade);
  const decimalPart = grade % 1;

  let halfStar = '';

  if (decimalPart >= 0.5) {
    halfStar = 'half';
  }

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push('checked');
  }

  if (halfStar !== '') {
    stars.push(halfStar);
  }

  const totalStars = stars.length;
  for (let i = totalStars; i < 5; i++) {
    stars.push('');
  }

  return stars;
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

  


truncateContent(content: string, maxLength: number): string {
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
}
toggleContent(blog: Blog): void {
  blog.expanded = !blog.expanded;
}
getBlogPhotoUrl(blogId: number): string {
  return this.blogService.getBlogPhoto(blogId);
}



nextPage(): void {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.loadBlogs();;
  }
}

prevPage(): void {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.loadBlogs();;
  }
}

goToPage(pageNumber: number): void {
  this.currentPage = pageNumber;
  this.loadBlogs();
}

generatePageNumbers(): number[] {
  const pageNumbers: number[] = [];
  for (let i = 0; i < this.totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}


 applyFilter(blogs: Blog[]): Blog[] {
  this.filteredBlogs = this.customFilterPipe.transform(this.blogs, this.searchQuery);
  return this.filteredBlogs
}
onSearchInput(event: any): void {
  this.applyFilter(this.blogs);
}


goToBlogDetails(blogId: number): void {
  this.router.navigate(['/blog', blogId]);
}

 
}
















