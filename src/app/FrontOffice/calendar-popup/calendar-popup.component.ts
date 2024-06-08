import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Importez le plugin d'interaction
import { EventService } from 'src/app/Services/event.service'; // Importez votre service d'événements ici

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.css']
})
export class CalendarPopupComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter<void>();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin], // Inclure le plugin d'interaction
    fixedWeekCount: false, // Permettre un nombre de semaines variable dans le mois
    events: [] // Initial empty array for events
  };

  constructor(private eventService: EventService) { } // Injectez votre service d'événements

  ngOnInit(): void {
    // Chargez les événements depuis votre service une fois que le composant est initialisé
    this.loadEvents();
  }
  closePopup(): void {
    this.closePopupEvent.emit(); // Émettre l'événement pour fermer le popup
  }

  loadEvents(): void {
    // Appelez votre service pour récupérer les événements
    this.eventService.getEvents().subscribe(
      (events: any[]) => {
        // Formatez les événements dans le format attendu par FullCalendar
        const formattedEvents = events.map(event => ({
          title: event.eventName,
          date: event.eventDate
          // Vous pouvez également ajouter d'autres propriétés d'événement ici
        }));
        // Mettez à jour la liste des événements dans calendarOptions
        this.calendarOptions.events = formattedEvents;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

}
