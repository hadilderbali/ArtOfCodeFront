import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/Services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  @Input() selectedDate: Date | null = null; // Utilisez @Input() pour la propriété d'entrée

  eventForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      city: [''],
      availableTickets: ['', Validators.min(0)],
      imageE: [''],
      eventType: [''],
      ticketPrice: ['', Validators.min(0)],
      eventDate: [this.selectedDate || null]
    });
  }

  createEvent() {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(() =>
        this.router.navigate(['back-list'])
      );
    } else {
      // Gérer les données de formulaire non valides
    }
  }
}
