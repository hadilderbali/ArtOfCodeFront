import { Component } from '@angular/core';
import { Blog } from '../Model/Blog';
import { BlogService } from '../services/blog.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Page } from '../Model/Page';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent {
  blogs: Blog[] = [];
  blog!: Blog;
  currentPage = 0;
  totalPages = 0;
  pageSize = 4; 
  filteredBlogs: Blog[] = [];
  overallRatings: { [blogId: number]: number } = {};

  constructor(private blogService: BlogService, private datePipe: DatePipe,private sanitizer: DomSanitizer,private router:Router) { }

  ngOnInit(): void {
    this.fetchBlogs();
  // Fetch blogs from service...
  this.blogs.forEach(blog => {
    blog.expanded = false; // Initialize expanded property
  });
  }

  fetchBlogs(): void {
    this.blogService.getBlogs(this.currentPage, this.pageSize)
      .subscribe((blogs: Page<Blog>) => {
        this.blogs = blogs.content;
        this.totalPages = blogs.totalPages;
        this.calculateRatings(); // Calculate ratings for fetched blogs
        // Update totalPages
      });
  }
  
  truncateContent(content: string, maxLength: number): string {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  }
  deleteBlog(id: number): void {
    this.blogService.deleteBlog(id).subscribe(() => {
      window.alert('are you sure you want delete this blog?');

      // Refresh the blog list after deletion
      this.fetchBlogs();
    });
  }
  navigateToUpdateBlog(blogId: number): void {
    this.router.navigate(['/editblog', blogId]);
}


toggleContent(blog: Blog): void {
  blog.expanded = !blog.expanded;
}

calculateRatings(): void {
  const ratingObservables = this.blogs.map(blog =>
    this.blogService.getOverallRating(blog.idBlog)
  );

  forkJoin(ratingObservables).subscribe(ratings => {
    ratings.forEach((rating, index) => {
      this.overallRatings[this.blogs[index].idBlog] = rating;
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



calculateDuration(createdDate: any): string {
  const now = new Date();
  const created = new Date(createdDate * 1000); // Convert seconds to milliseconds
  const duration = now.getTime() - created.getTime();

  // Convert duration to a Date object
  const durationDate = new Date(duration);

  // Format duration using DatePipe
  const formattedDuration = this.datePipe.transform(durationDate, 'HH:mm:ss');

  return formattedDuration || 'Invalid Date';
}
getBlogPhotoUrl(blogId: number): string {
  return this.blogService.getBlogPhoto(blogId);
}

nextPage(): void {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
this. fetchBlogs()
  }
}

prevPage(): void {
  if (this.currentPage > 0) {
    this.currentPage--;
this.fetchBlogs()  }
}

goToPage(pageNumber: number): void {
  this.currentPage = pageNumber;
  this. fetchBlogs();
}

generatePageNumbers(): number[] {
  const pageNumbers: number[] = [];
  for (let i = 0; i <= this.totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}
navigateToAddblog(){
  this.router.navigate(['/addblog'])
}


}