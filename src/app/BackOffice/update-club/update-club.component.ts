import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/Models/club';
import { ClubService } from 'src/app/Services/club.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-club',
  templateUrl: './update-club.component.html',
  styleUrls: ['./update-club.component.css']
})
export class UpdateClubComponent implements OnInit {
  clubForm!: FormGroup;
  clubId!: number;
  club: Club = new Club();

  constructor(private fb: FormBuilder, private router: Router, private clubService: ClubService, private activeroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      name: ['', Validators.required],
      objective: ['', Validators.required],
      president: ['', Validators.required]
     

    });

    this.activeroute.params.subscribe((param) => {
      this.clubId = param['clubId'];
    });

    this.clubService.getClubById(this.clubId).subscribe((event) => {
      console.log(event);
      
      this.clubForm.patchValue({
        'name': event.name,
        'objective': event.objective,
        'president': event.president,
      
      });
    });
  }

  updateClub() {
    let event = new Club();
    event.name = this.clubForm.controls['name'].value;
    event.objective = this.clubForm.controls['objective'].value;
    event.president = this.clubForm.controls['president'].value;
   


    this.clubService.updateClub(event, this.clubId).subscribe(() => {
      this.router.navigate(['club-back']);
    });
  }
}
