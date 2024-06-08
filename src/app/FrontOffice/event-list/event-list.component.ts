import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/event';
import { EventService } from 'src/app/Services/event.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog'; // Importez MatDialog pour gérer les fenêtres contextuelles
import { CalendarPopupComponent } from 'src/app/FrontOffice/calendar-popup/calendar-popup.component'; // Importez le composant de dialogue du calendrier

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchText: string = '';
  minPrice: number = 0;
  maxPrice: number = 100;
  isPopupOpen = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [] // Initial empty array for events
  };

  constructor(private eventservice: EventService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.eventservice.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
        this.filteredEvents = events; // Initialise les événements filtrés avec tous les événements initialement
        this.updateCalendarEvents(events);
      }
    );
  }

  openCalendarPopup(): void {
    // Ouvrir la fenêtre contextuelle pour afficher le calendrier
    const dialogRef = this.dialog.open(CalendarPopupComponent, {
      width: '600px', // Taille de la fenêtre contextuelle
      // Autres options de configuration de la fenêtre contextuelle si nécessaire
    });
  }
  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter(event =>
      (event.eventName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        event.city.toLowerCase().includes(this.searchText.toLowerCase())) &&
      event.ticketPrice >= this.minPrice &&
      event.ticketPrice <= this.maxPrice
    );
  }

  updateCalendarEvents(events: Event[]): void {
    const mappedEvents = events.map(event => ({
      title: event.eventName,
      date: event.eventDate
    }));
    this.calendarOptions.events = mappedEvents;
  }

  likeEvent(event: Event): void {
    if (!event.likes && !event.dislikes) {
      this.eventservice.likeEvent(event.idEvent).subscribe(
        (updatedEvent: Event) => {
          // Mise à jour des données de l'événement
          event.likes = updatedEvent.likes;
        }
      );
    }
  }
  
  dislikeEvent(event: Event): void {
    if (!event.likes && !event.dislikes) {
      this.eventservice.dislikeEvent(event.idEvent).subscribe(
        (updatedEvent: Event) => {
          // Mise à jour des données de l'événement
          event.dislikes = updatedEvent.dislikes;
        }
      );
    }
  }
}
