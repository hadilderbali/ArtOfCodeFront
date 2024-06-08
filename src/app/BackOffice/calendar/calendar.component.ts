import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from 'src/app/Services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() openAddEventFormEvent = new EventEmitter<Date>();
  @Output() dateSelected = new EventEmitter<Date>();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    fixedWeekCount: false,
    events: []
  };

  constructor(private eventService: EventService, private router: Router) {} // Injectez EventService

  ngOnInit(): void {
    this.loadEvents();
  }

  closePopup(): void {
    this.closePopupEvent.emit();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (events: any[]) => {
        const formattedEvents = events.map(event => ({
          title: event.eventName,
          date: event.eventDate
        }));
        this.calendarOptions.events = formattedEvents;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  handleDateClick(event: any): void {
    const clickedDate = new Date(event.dateStr);
    this.dateSelected.emit(clickedDate); // Émettre l'événement avec la date sélectionnée

    // Rediriger vers la page de création d'événement (createEvent)
    this.router.navigate(['createEvent']);
  }
}
