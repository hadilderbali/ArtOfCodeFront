import { Component } from '@angular/core';
import { Blog, BlogCategory } from '../Model/Blog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-updateblog',
  templateUrl: './updateblog.component.html',
  styleUrls: ['./updateblog.component.css']
})

export class UpdateblogComponent {
  categories: BlogCategory[] = Object.values(BlogCategory);
  blogForm!: FormGroup;
  urlPattern = '^(http|https)://.*$'; // Regular expression pattern for valid URL

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private blogService: BlogService,private datePipe: DatePipe) { }

  ngOnInit(): void {
      this.blogForm = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        url: ['https://', [Validators.required, Validators.pattern(this.urlPattern)]], // Prefill with 'https://' and apply URL pattern validation
        createdDate: [new Date()],

        blogCategory: ['', Validators.required]
      });

      this.route.paramMap.subscribe(params => {
          const blogIdString = params.get('id');
          if (blogIdString) {
              const blogId = +blogIdString;
              this.blogService.getBlog(blogId).subscribe(blog => {
                  this.blogForm.patchValue({
                      title: blog.title,
                      content: blog.content,
                      url: blog.url,
                      createdDate:blog.createdDate,
                      blogCategory: blog.blogCategory
                  });
              });
          }
      });
  }

  updateBlog(): void {
    this.route.paramMap.subscribe(params => {
        const blogIdString = params.get('id');
        if (blogIdString) {
            const blogId = +blogIdString;
            
            // Get the createdDate value from the form
            let createdDate = this.blogForm.get('createdDate')!.value;

            // Convert createdDate to a Date object if it's not already
            if (!(createdDate instanceof Date)) {
                createdDate = new Date(createdDate);
            }

            // Adjust time by adding two hours
            createdDate.setHours(createdDate.getHours() + 2);

            // Convert createdDate to string in the desired format
            const createdDateFormatted = createdDate.toISOString().replace(/-/g, '/').replace('T', ' ').slice(0, -5);

            const updatedBlog: Blog = {
                idBlog: blogId, // Use the blogId obtained from the route parameters
                title: this.blogForm.value.title,
                content: this.blogForm.value.content,
                url: this.blogForm.value.url,
                createdDate: createdDateFormatted, // Use the formatted createdDate
                blogCategory: this.blogForm.value.blogCategory
            };

            this.blogService.updateBlog(updatedBlog.idBlog, updatedBlog).subscribe(() => {
                console.log('Blog updated successfully');
                this.router.navigate(['/blogs']);
            }, error => {
                console.error('Error updating blog:', error);
            });
        }
    });
  }}