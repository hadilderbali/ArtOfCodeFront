import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Event } from 'src/app/Models/event';
import { EventService } from 'src/app/Services/event.service';
import { Router } from '@angular/router'; // Importer Router
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-back-list',
  templateUrl: './back-list.component.html',
  styleUrls: ['./back-list.component.css']
})
export class BackListComponent implements OnInit {
  p: number = 1; // Numéro de page par défaut
  events: Event[] = [];
  filteredEvents: Event[] = []; // Tableau pour stocker les événements filtrés
  searchText: string = ''; // Texte de recherche
  minPrice: number = 0; // Prix minimum
  maxPrice: number = 100; // Prix maximum
 isPopupOpen = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [] // Initial empty array for events
  };

  constructor(private eventservice: EventService, private router: Router) {} // Injecter Router

  ngOnInit(): void {
    this.eventservice.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
        this.filteredEvents = events; // Initialiser les événements filtrés avec tous les événements initialement
      }
    );
  }

  // Fonction pour filtrer les événements en fonction du texte de recherche et des prix min/max
  filterEvents() {
    this.filteredEvents = this.events.filter(event =>
      (event.eventName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      event.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      event.city.toLowerCase().includes(this.searchText.toLowerCase())) &&
      event.ticketPrice >= this.minPrice &&
      event.ticketPrice <= this.maxPrice
    );
  }
  createEvent() {
    this.router.navigate(['back-list']);

   
  }

  removeEvent(id: number) {
    if (id !== undefined) {
      this.eventservice.removeEvent(id).subscribe({
        next: () => {
          this.events = this.events.filter((event) => event.idEvent !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('Invalid event id:', id);
    }
  }

  updateEvent(idEvent: number) {
    this.router.navigate(['updateEvent', idEvent]); // Utiliser router au lieu de route
  }
  
 
  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
 
  }


