// blog-view.component.ts
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Model/Blog';
import { DatePipe } from '@angular/common';
import { CustomFilterPipe } from '../Services/custom-filter-pipe.pipe';
import { Page } from '../Model/Page';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  categories: string[] = ['BALLET', 'HIPHOP', 'BALLROOM', 'SALSA', 'LATINA'];
  selectedCategory: string = '';

  blogs: Blog[] = [];
  blog!: Blog;
  maxRating: number = 5;
  currentRating: number = 0;
  readOnly: boolean = true;
  rating: number = 0;
  hovered: number | null = null;
  selectedRatings: number[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 3;
  searchQuery = '';
  category: string = '';
  filteredBlogs: Blog[] = [];
  selectedBlogId: number | null = null;
  selectedRating: number | null = null;
  overallRatings: { [blogId: number]: number } = {};

  constructor(
    public blogService: BlogService,
    private datePipe: DatePipe,
    private customFilterPipe: CustomFilterPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }


  
  loadBlogs(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredBlogs = this.blogs.filter(blog =>
        blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.blogCategory.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.totalPages = 1;
      if (this.filteredBlogs.length === 0) {
        alert('No blogs found.');
      }
    } else {
      this.blogService.getBlogs(this.currentPage, this.pageSize)
        .subscribe((page: Page<Blog>) => {
          const blogPhotoObservables = page.content.map(blog => 
            this.blogService.getBlogPhoto(blog.idBlog)
              .pipe(tap(url => this.blogPhotoUrl[blog.idBlog] = url))
          );
  
          forkJoin(blogPhotoObservables).subscribe(() => {
            this.blogs = page.content;
            this.totalPages = page.totalPages;
            this.filteredBlogs = this.blogs;
            this.calculateRatings();
          }, error => {
            console.error('Error fetching blog photos:', error);
          });
        });
    }
  }

  calculateRatings(): void {
    const ratingObservables = this.filteredBlogs.map(blog =>
      this.blogService.getOverallRating(blog.idBlog)
    );

    forkJoin(ratingObservables).subscribe(ratings => {
      ratings.forEach((rating, index) => {
        console.log(`Blog ID: ${this.filteredBlogs[index].idBlog}, Rating: ${rating}`);
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

  truncateContent(content: string, maxLength: number): string {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  }

  toggleContent(blog: Blog): void {
    blog.expanded = !blog.expanded;
  }

  blogPhotoUrl: any[] = [];

  getBlogPhotoUrl(blogId: number) {
    this.blogService.getBlogPhoto(blogId).subscribe(
      url => {
        this.blogPhotoUrl[blogId] = url;
        console.log(url)
      },
      error => {
        console.error('Error fetching blog photo URL:', error);
      }
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadBlogs();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadBlogs();
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
    return this.filteredBlogs;
  }

  onSearchInput(event: any): void {
    this.applyFilter(this.blogs);
  }

  goToBlogDetails(blogId: number): void {
    this.router.navigate(['/blog', blogId]);
  }
}
