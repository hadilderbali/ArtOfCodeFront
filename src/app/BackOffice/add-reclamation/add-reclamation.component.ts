import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReclamationCompetition } from 'src/app/models/reclamationCompetition';
import { WebSocketService } from 'src/app/services/WebSocketService';
import { ReclamationCompetitionService } from 'src/app/services/reclamationCompetition.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit{
  public get fb(): FormBuilder {
    return this._fb;
  }
  public set fb(value: FormBuilder) {
    this._fb = value;
  }
  reclamationForm!: FormGroup;
  reclamations: ReclamationCompetition[] = [];

constructor(
  private formBuilder: FormBuilder, private reclamationCompetitionService :ReclamationCompetitionService , private _fb: FormBuilder) {
  this.reclamationForm = this.formBuilder.group({
    type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    dateCreation: ['', Validators.required],
    reclamationStatus: ['', Validators.required],
  });
}
  

successMessage: string | null = null;
errorMessage: string | null = null;
addReclamationCompetiton(): void {
  if (this.reclamationForm.valid) {
    const selectedTypes = this.typeFormArray.value as string[]; // Récupérer les types sélectionnés
    const newReclamation = {
      ...this.reclamationForm.value,
      type: selectedTypes  // Assurez-vous que type est un tableau de chaînes
    };

    this.reclamationCompetitionService.addreclamation(newReclamation)
      .subscribe(
        () => {
          this.reclamationForm.reset();
          this.successMessage = 'Reclamation added successfully!';
          this.showSuccessModal();
          setTimeout(() => {
            this.closeSuccessModal();
          }, 3000);
        },
        (error) => {
          console.error('Error adding reclamation:', error);
        }
      );
  } else {
    this.markFormGroupTouched(this.reclamationForm);
    console.error('Invalid form - please fill in all required fields.');
  }
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
    modal.classList.add('show');
    modal.style.display = 'block';
  }
}

closeSuccessModal(): void {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
}



cancelEdit(){
  this.reclamationForm.reset();
 
}
 
reclamationStatus:String[]=['PENDING ','IN_PROGRESS','RESOLVED'];
reclamationTypes: string[] = ['Errors in Results', 'Technical Issue', 'Judging Criteria', 'Integrity and Respect'];

  
ngOnInit(): void {
  this.reclamationForm = this.formBuilder.group({
    type: this.formBuilder.array([], Validators.required),
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10000)]],
    dateCreation: ['', Validators.required],
    reclamationStatus: ['', Validators.required],
    
  });
  
}

get typeFormArray() {
  return this.reclamationForm.get('type') as FormArray;
}

toggleTypeSelection(type: string) {
  const typeFormArray = this.reclamationForm.get('type') as FormArray;
  if (typeFormArray.value.includes(type)) {
    // Si le type est déjà sélectionné, le supprimer du FormArray
    typeFormArray.removeAt(typeFormArray.value.findIndex((t: string) => t === type));
  } else {
    // Sinon, ajouter le type au FormArray
    typeFormArray.push(new FormControl(type));
  }
}




   loadUsers(): void{
     this.reclamationCompetitionService.getAllReclamations()
     .subscribe(
       users => this.reclamations = users,
       error => console.error('error, getall', error)
     );
   }
 
   selectedReclamation: ReclamationCompetition | null = null;
   
   
  
 
   
   createForm(): void {
     this.reclamationForm = this.fb.group({
      type: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
       description: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
       dateCreation: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/) // Format de date ISO 8601 (YYYY-MM-DDTHH:mm:ss)
      ]],
   
       reclamationStatus: ['', Validators.required],
     
       
     });
   }
 
   
   editUser(reclamationCompetition: ReclamationCompetition): void {
     this.selectedReclamation = reclamationCompetition;
     this.reclamationForm.patchValue({
      type: reclamationCompetition.type,
       description: reclamationCompetition.description,
       dateCreation: reclamationCompetition.dateCreation,
      
       reclamationStatus: reclamationCompetition.reclamationStatus
     });
   }
   updateReclamation(): void {
     if (this.selectedReclamation && this.reclamationForm.valid) {
       const updatedReclamation = { ...this.selectedReclamation, ...this.reclamationForm.value } as ReclamationCompetition;
       this.reclamationCompetitionService.updateReclamationCompetition(this.selectedReclamation.reclamationId,updatedReclamation).subscribe(
         response => {
           console.log('success, updateUser', response);
           this.loadUsers();
           this.reclamationForm.reset();
           this.selectedReclamation=null; 
         },
         error => console.error('error, updateReclamation', error)
       );
     }
   }
 

  

  
 

}
