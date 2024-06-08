import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/Models/tutorial';
import { TutorialCategory } from 'src/app/Models/tutorialCategory';

import { TutorialService } from 'src/app/Services/tutorial.service';

@Component({
  selector: 'app-update-tutorial',
  templateUrl: './update-tutorial.component.html',
  styleUrls: ['./update-tutorial.component.css']
})
export class UpdateTutorialComponent {
  id!: number;
  tutorialForm!: FormGroup;
  tutorial!: Tutorial;
  levels: string[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']; // Change 'level' to 'levels' to avoid conflicts
  tutorialCategorys:String[]=[ 'BALLET','HIPHOP','BALLROOM',' SALSA','LATINA']

  constructor(private _router: Router,
              public tutorialservice: TutorialService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm(); // Initialize the form

    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.tutorialservice.getTutorialById(this.id)
        .subscribe(
          data => {
            console.log('Data received from server:', data);
            this.tutorial = data; // Assign the received tutorial to a class property
            this.patchFormWithData(); // Patch the form with received data
          }
        );
    }
  }

  initForm() {
    this.tutorialForm = this.formBuilder.group({
      title: [''],
      description: [''],
      duration: [''],
      video: [''],
      level: [''], // Ajoutez une virgule à la fin de cette ligne
      TutorialCategory: [''],
    });
  }
  

  patchFormWithData() {
    this.tutorialForm.patchValue({
      title: this.tutorial.title,
      description: this.tutorial.description,
      duration: this.tutorial.duration,
      level: this.tutorial.level ,// Patch the form with the tutorial's level
      TutorialCategory:this.tutorial.tutorialCategory,
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.tutorialForm.patchValue({
        video: file
      });
    }
  }

  update() {
    const formData = this.tutorialForm.value;

    const tutorialData: Tutorial = {
      tutorialId: this.id,
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      video: formData.video,
      level: formData.level,
      

      likes: undefined,
      dislikes: undefined,
      comments: [],
      liked: false,
      disliked: false,
      tutorialCategory: formData.tutorialCategory
    };

    this.tutorialservice.updatetutorial(this.id, tutorialData).subscribe(
      (response) => {
        console.log('Tutorial updated successfully:', response);
        this._router.navigate(['/view-tutorial']);
      },
      (error) => {
        console.error('Error updating tutorial:', error);
      }
    );
  }
}
