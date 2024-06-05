import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { Blog, BlogCategory } from '../Model/Blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  blogForm!: FormGroup;
  urlPattern = '^(http|https)://.*$'; // Regular expression pattern for valid URL
  selectedImage: File | null = null;
  imgURL:any;
  message!: string;
imagePath!: string;
  adminId: number = 10; // Mock recruiter ID for testing

  categories: BlogCategory[] = Object.values(BlogCategory);

  constructor(private formBuilder: FormBuilder, private blogService: BlogService,private router:Router) { }

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      url: ['https://', [Validators.required, Validators.pattern(this.urlPattern)]],
      blogCategory: ['', Validators.required],
      createdDate: [new Date()]
    });
    console.log('Form initialized with createdDate:', this.blogForm.get('createdDate')?.value);

}
onSubmit(): void {
  if (this.blogForm.valid && this.selectedImage) {
    const formData = new FormData();

    // Append form fields
    formData.append('title', this.blogForm.get('title')!.value);
    formData.append('content', this.blogForm.get('content')!.value);
    formData.append('url', this.blogForm.get('url')!.value);
    formData.append('blogCategory', this.blogForm.get('blogCategory')!.value);

    // Get createdDate from the form
    let createdDate = this.blogForm.get('createdDate')!.value;

    // Convert createdDate to a Date object if it's not already
    if (!(createdDate instanceof Date)) {
      createdDate = new Date(createdDate);
    }

    // Adjust time by adding two hours
    createdDate.setHours(createdDate.getHours() + 2);

    // Convert createdDate to string in the desired format
    const createdDateFormatted = createdDate.toISOString().replace(/-/g, '/').replace('T', ' ').slice(0, -5);
    formData.append('createdDate', createdDateFormatted);

    formData.append('image', this.selectedImage);

    this.blogService.addBlog(formData, this.adminId).subscribe(
      response => {
        console.log('Blog added successfully:', response);
        // Navigate to /blogs after successful addition
        console.log('Navigating to /blogs...');
        this.router.navigate(['/blogs']);
      },
      error => {
        console.error('Error adding blog:', error);
        // Handle error message or display error to the user
      }
    );
  } else {
    console.log('Form is invalid or image is not selected.');
  }
}


  
  


  onImageChange(event: any): void {
    if (event.target.files.length > 0)
      {
        const file = event.target.files[0];
        this.selectedImage = file;
       // this.f['profile'].setValue(file);
   
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
   
      var reader = new FileReader();
      
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
    }
       
  
    }
}