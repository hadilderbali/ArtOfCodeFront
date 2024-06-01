import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app/competition';
import { CompetitionService } from 'src/app/competition.service';

@Component({
  selector: 'app-list-competition-front',
  templateUrl: './list-competition-front.component.html',
  styleUrls: ['./list-competition-front.component.css']
})
export class ListCompetitionFrontComponent {
  event!: Competition
  eventList: Competition[] = [];
  currentPage: number = 1;
  totalEvents: number = 0;
  pageSize: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  searchTerm:any;
  constructor(public _router: Router, public eventservice: CompetitionService) { }

  ngOnInit(): void {
    this.getEvents();
  }
     
  getEvents(): void {
    this.eventservice.getEventsPaged(this.currentPage, this.pageSize)
      .subscribe(response => {
        this.eventList = response.content; // Utilisez response.content pour obtenir la liste des événements
        this.totalEvents = response.totalElements;
        this.totalPages = response.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      });
  }

  search(): void {
    this.eventservice.searchCompetitions(this.searchTerm)
        .subscribe(results => {
            this.eventList = results;
        });
}


  onPageChange(page: number): void {
    this.currentPage = page;
    this.getEvents();
  }



  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getEvents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getEvents();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getEvents();
    }
  }

  addEvent(): void {
    this._router.navigate(['add-event'])
  }
  Candidature(idCompetition: number, expired: boolean): void {
    if (expired) {
      // Si la compétition est expirée, affichez une alerte
      alert("This competition is expired.");
    } else {
      // Sinon, redirigez vers la page de candidature
      this._router.navigate(['Candidature/', idCompetition]);
    }
  }

  updatevent(id: number): void {
    this._router.navigate(['/update-event', id])
  }
}


