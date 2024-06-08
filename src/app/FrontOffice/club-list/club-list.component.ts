import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/Models/club';
import { ClubService } from 'src/app/Services/club.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {

  clubs: Club[] = [];
  p: number = 1; // Numéro de page par défaut


  filteredClubs: Club[] = [];
  searchText: string = '';

  constructor(private clubservice: ClubService,private router: Router) { }

  ngOnInit(): void {
    this.clubservice.getClubs().subscribe(
      (clubs: Club[]) => {
        this.clubs = clubs;
        this.filteredClubs = clubs; // Initialise les événements filtrés avec tous les événements initialement

      }
    );
  }
  updateClub(clubId: number) {
    this.router.navigate(['/updateClub', clubId]);
  }
  filterClubs(): void {
    this.filteredClubs = this.clubs.filter(event =>
      (event.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        event.president.toLowerCase().includes(this.searchText.toLowerCase()) ||
        event.objective.toLowerCase().includes(this.searchText.toLowerCase())) 
      
    );
  }
}
