import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/Models/club';
import { ClubService } from 'src/app/Services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-back',
  templateUrl: './club-back.component.html',
  styleUrls: ['./club-back.component.css']
})
export class ClubBackComponent {
clubs: Club[] = [];
club!: Club ;
p: number = 1; // Numéro de page par défaut




constructor(private clubservice: ClubService,private router: Router) { }

ngOnInit(): void {
  this.clubservice.getClubs().subscribe(
    (clubs: Club[]) => {
      this.clubs = clubs;
      
    }
  );
}
updateClub(clubId: number) {
  this.router.navigate(['/updateClub', clubId]);
}
removeClub(id: number) {
  if (id !== undefined) {
    this.clubservice.removeClub(id).subscribe({
      next: () => {
        this.clubs = this.clubs.filter((event) => event.clubId !== id);
      },
      error: (err) => console.log(err),
    });
  } else {
    console.error('Invalid event id:', id);
  }
}
getClubPhotoById(clubId: number): string {
  return this.clubservice.getClubPhotoById(clubId);
}


}
