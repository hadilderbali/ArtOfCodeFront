import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/Services/tutorial.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tutorial } from 'src/app/Models/tutorial';


@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent  implements OnInit{
  public get fb(): FormBuilder {
    return this._fb;
  }
  public set fb(value: FormBuilder) {
    this._fb = value;
  }
  tutorialForm!: FormGroup;
  tutorials: Tutorial[] = [];

constructor(
  private formBuilder: FormBuilder, private tutarialService :TutorialService , private _fb: FormBuilder) {
  this.tutorialForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    duration: ['', Validators.required],
    video: ['', Validators.required],
    level: ['', Validators.required],
    tutorialCategory: ['', Validators.required],
  
   
  });
}

successMessage: string | null = null;
errorMessage: string | null = null;
addTutorial(): void {
  // Vérifier si le formulaire est invalide
  if (this.tutorialForm.invalid) {
    // Marquer tous les champs comme "touched" pour afficher les erreurs
    this.markFormGroupTouched(this.tutorialForm);
    console.error('Invalid form - please fill in all required fields.');
    return;
  }

  // Si le formulaire est valide, continuer avec l'ajout du tutoriel
  const newTutorial = this.tutorialForm.value;
  console.log('New Tutorial Data:', newTutorial);

  // Appeler le service pour ajouter le tutoriel (remplacez cette partie par votre logique)
  this.tutarialService.addtutorial(newTutorial)
    .subscribe(
      () => {
        // Réinitialiser le formulaire après ajout avec succès
        this.tutorialForm.reset();
        this.successMessage = 'Tutorial added successfully!';
        this.showSuccessModal(); // Afficher la boîte modale de succès
        setTimeout(() => {
          this.closeSuccessModal(); // Fermer automatiquement la boîte modale après quelques secondes
        }, 3000); // Temps en millisecondes avant de fermer la boîte modale
      },
      (error) => {
        console.error('Error adding tutorial:', error);
        // Gérer l'erreur d'ajout de tutoriel
      }
    );
}

markFormGroupTouched(formGroup: FormGroup) {
  // Fonction récursive pour marquer tous les contrôles comme "touched"
  Object.values(formGroup.controls).forEach(control => {
    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control); // Appel récursif si le contrôle est un groupe
    } else {
      control.markAsTouched(); // Marquer le contrôle comme "touched"
    }
  });
}


showSuccessModal(): void {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

closeSuccessModal(): void {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.display = 'none';
  }
}


cancelEdit(){
  this.tutorialForm.reset();
  this.selectedTutorial = null;
}
 
  level:String[]=['BEGINNER ','INTERMEDIATE','ADVANCED'];
  tutorialCategory:String[]=[ 'BALLET','HIPHOP','BALLROOM',' SALSA','LATINA']
 
  
  
  ngOnInit(): void{
   this.loadUsers();
  }
  loadUsers(): void{
    this.tutarialService.getAllTutorials()
    .subscribe(
      users => this.tutorials = users,
      error => console.error('error, getall', error)
    );
  }

  selectedTutorial: Tutorial | null = null;
  
  
 

  
  createForm(): void {
    this.tutorialForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(10000000), Validators.pattern('[a-zA-Z ]*')]],
      duration: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      video: ['', Validators.required],
  
      level: ['', Validators.required],
      tutorialCategory: ['', Validators.required],
   
      
    
      
    });
  }

  
  editUser(tutorial: Tutorial): void {
    this.selectedTutorial = tutorial;
    this.tutorialForm.patchValue({
      title: tutorial.title,
      description: tutorial.description,
      duration: tutorial.duration,
      vidéo: tutorial.video,
      level: tutorial.level,
     tutorialCategory: tutorial.tutorialCategory
    });
  }
  updateTutorial(): void {
    if (this.selectedTutorial && this.tutorialForm.valid) {
      const updatedTutorial = { ...this.selectedTutorial, ...this.tutorialForm.value } as Tutorial;
      this.tutarialService.updatetutorial(this.selectedTutorial.tutorialId, updatedTutorial).subscribe(
        response => {
          console.log('success, updateUser', response);
          this.loadUsers();
          this.tutorialForm.reset();
          this.selectedTutorial=null; 
        },
        error => console.error('error, updateTutorial', error)
      );
    }
  }

}