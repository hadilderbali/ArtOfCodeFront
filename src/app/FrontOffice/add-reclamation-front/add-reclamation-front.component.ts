import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReclamationCompetition } from 'src/app/models/reclamationCompetition';
import { ReclamationCompetitionService } from 'src/app/services/reclamationCompetition.service';

@Component({
  selector: 'app-add-reclamation-front',
  templateUrl: './add-reclamation-front.component.html',
  styleUrls: ['./add-reclamation-front.component.css']
})
export class AddReclamationFrontComponent implements OnInit {
  reclamationForm!: FormGroup;
  reclamations: ReclamationCompetition[] = [];

  constructor(
    private formBuilder: FormBuilder, private reclamationCompetitionService: ReclamationCompetitionService) {
    this.reclamationForm = this.formBuilder.group({
      type: this.formBuilder.array([], Validators.required),
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10000)]],
    });
  }

  successMessage: string | null = null;
  errorMessage: string | null = null;

  addReclamationCompetiton(): void {
    if (this.reclamationForm.valid) {
      const selectedTypes = this.typeFormArray.value as string[];
      const newReclamation = {
        ...this.reclamationForm.value,
        type: selectedTypes,
        dateCreation: new Date().toISOString(),
        reclamationStatus: 'PENDING',
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
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
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

  cancelEdit() {
    this.reclamationForm.reset();
  }

  reclamationTypes: string[] = ['Errors in Results', 'Technical Issue', 'Judging Criteria', 'Integrity and Respect', 'Feedback'];

  ngOnInit(): void {
    this.reclamationForm = this.formBuilder.group({
      type: this.formBuilder.array([], Validators.required),
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10000)]],
    });
  }

  get typeFormArray() {
    return this.reclamationForm.get('type') as FormArray;
  }

  toggleTypeSelection(type: string) {
    const typeFormArray = this.reclamationForm.get('type') as FormArray;
    if (typeFormArray.value.includes(type)) {
      typeFormArray.removeAt(typeFormArray.value.findIndex((t: string) => t === type));
    } else {
      typeFormArray.push(new FormControl(type));
    }
  }

  loadUsers(): void {
    this.reclamationCompetitionService.getAllReclamations()
      .subscribe(
        users => this.reclamations = users,
        error => console.error('error, getall', error)
      );
  }

  selectedReclamation: ReclamationCompetition | null = null;

  createForm(): void {
    this.reclamationForm = this.formBuilder.group({
      type: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      dateCreation: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)
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
      this.reclamationCompetitionService.updateReclamationCompetition(this.selectedReclamation.reclamationId, updatedReclamation).subscribe(
        response => {
          console.log('success, updateUser', response);
          this.loadUsers();
          this.reclamationForm.reset();
          this.selectedReclamation = null;
        },
        error => console.error('error, updateReclamation', error)
      );
    }
  }
}
