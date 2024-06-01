import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-tutorial',
  templateUrl: './view-tutorial.component.html',
  styleUrls: ['./view-tutorial.component.css']
})
export class ViewTutorialComponent {

  tutorials: Tutorial[] = [];
selectedDuration: any;
p: number=1;
  

 

  constructor(private tutorialService: TutorialService,public router: Router){
   
  }
  editingTutorial: any;

cancelEdit() {
this.tutorialForm.reset();
}
  tutorialForm!: FormGroup;
  level:String[]=['BEGINNER ','INTERMEDIATE','ADVANCED'];
  tutorialCategory:String[]=[ 'BALLET','HIPHOP','BALLROOM',' SALSA','LATINA'];
  
  
  
  ngOnInit(): void{
   this.loadUsers();
 
 
  }
  loadUsers(): void{
    this.tutorialService.getAllTutorials()
    .subscribe(
      users => this.tutorials = users,
      error => console.error('error, getall', error)
    );
  }

 
  private getCompetitions(){
    this.tutorialService.getAllTutorials().subscribe(data => {
      this.tutorials=data;
  
    })
  }
  
  

  deleteTutorial(id: number): void {
    // Afficher une boîte de dialogue de confirmation
    const confirmDelete = window.confirm('Are you sure you want to delete this tutorial?');
  
    // Si l'utilisateur confirme, procéder à la suppression
    if (confirmDelete) {
      this.tutorialService.deleteTutorial(id).subscribe(
        response => {
          console.log('success, deleteTutorial', response);
          this.loadUsers();
        },
        error => console.error('error, deleteTutorial', error)
      );
    }

  
  }

  update(id: number) {
    
    this.router.navigate(['/admin/update-tutorial', id]); 

  }

 

 
  
}
