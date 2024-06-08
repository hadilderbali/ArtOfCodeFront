import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationCompetition } from 'src/app/Models/reclamationCompetition';
import { ReclamationCompetitionService } from 'src/app/Services/reclamationCompetition.service';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class UpdateReclamationComponent {

  id!: number;
  reclamationForm!: FormGroup;
  reclamation!: ReclamationCompetition;
  reclamationStatus: string[] = ['PENDING', 'IN_PROGRESS', 'RESOLVED'];
reclamationType: string[] = ['Errors in Results', 'Technical Issue', 'Judging Criteria', 'Integrity and Respect'];


  constructor(private _router: Router,
              public reclamationService: ReclamationCompetitionService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm(); // Initialize the form
    
    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.reclamationService.getReclamationCompetitionById(this.id)
        .subscribe(
          data => {
            console.log('Data received from server:', data);
            this.reclamation = data; // Assign the received tutorial to a class property
            this.patchFormWithData(); // Patch the form with received data
          }
        );
    }
  }

  initForm() {
    this.reclamationForm = this.formBuilder.group({
      types: this.formBuilder.array([]),
      description: [''],
      dateCreation: [''], // Ajouter dateCreation ici
    
      reclamationStatus: [''] // Initialize level field with an empty string
    });
  }

  patchFormWithData() {
    const typesArray = this.reclamationForm.get('types') as FormArray;
    typesArray.clear(); // Réinitialiser les types sélectionnés
  
    // Vérifier si this.reclamation.types est un tableau
    if (Array.isArray(this.reclamation.type)) {
      // Itérer sur les types et les ajouter au FormArray
      this.reclamation.type.forEach((type: string) => {
        typesArray.push(new FormControl(type));
      });
    }
    // Convertir le timestamp Unix en millisecondes en un objet Date
  const dateCreation = new Date(this.reclamation.dateCreation);

  // Formater la date au format "yyyy-MM-dd"
  const formattedDate = dateCreation.toISOString().substring(0, 10);

  // Patch du formulaire avec la date formatée
  this.reclamationForm.patchValue({
    description: this.reclamation.description,
    dateCreation: formattedDate,
    reclamationStatus: this.reclamation.reclamationStatus
  });
  }
  
  
  
  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.reclamationForm.patchValue({
        video: file
      });
    }
  }

  update() {
    if (this.reclamationForm.valid) {
      const formData = this.reclamationForm.value;
      const reclamationData: ReclamationCompetition = {
        reclamationId: this.id,
        type: formData.types,
        description: formData.description,
        dateCreation: formData.dateCreation,
        reclamationStatus: formData.reclamationStatus,
        sentiment: ''
      };
  
      this.reclamationService.updateReclamationCompetition(this.id, reclamationData)
        .subscribe(
          (response) => {
            console.log('Reclamation updated successfully:', response);
            this._router.navigate(['/view-reclamation']);
          },
          (error) => {
            console.error('Error updating reclamation:', error);
            if (error.error && error.error.message) {
              console.error('Server response:', error.error.message);
            }
          }
        );
    } else {
      console.error('Invalid form - please fill in all required fields.');
      this.markFormGroupTouched(this.reclamationForm);
    }
  }
  
   markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  toggleTypeSelection(type: string): void {
    const typesArray = this.reclamationForm.get('types') as FormArray;
    const types = typesArray.value as string[];
  
    if (types.includes(type)) {
      typesArray.removeAt(types.indexOf(type)); // Décocher le type
    } else {
      typesArray.push(new FormControl(type)); // Cocher le type
    }
  }
  
  isTypeSelected(type: string): boolean {
    const typesArray = this.reclamationForm.get('types') as FormArray;
    const types = typesArray.value as string[];
    return types.includes(type);
  }

  
  
}
