import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/event';
import { EventService } from 'src/app/Services/event.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  eventForm!: FormGroup;
  idEvent!: number;
  event: Event = new Event();

  constructor(private fb: FormBuilder, private router: Router, private eventService: EventService, private activeroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      availableTickets: [''],
      imageE: [''],
      createdAt: [''],
      eventType: [''],
      eventDate: [''],
      ticketPrice:['']

    });

    this.activeroute.params.subscribe((param) => {
      this.idEvent = param['idEvent'];
    });

    this.eventService.getEventById(this.idEvent).subscribe((event) => {
      console.log(event);
      
      this.eventForm.patchValue({
        'eventName': event.eventName,
        'description': event.description,
        'city': event.city,
        'availableTickets': event.availableTickets,
        'imageE': event.imageE,
        'eventType': event.eventType,
        'eventDate': event.eventDate,
        'ticketPrice': event.ticketPrice,

      
      });
    });
  }

  updateEvent() {
    let event = new Event();
    event.eventName = this.eventForm.controls['eventName'].value;
    event.description = this.eventForm.controls['description'].value;
    event.city = this.eventForm.controls['city'].value;
    event.availableTickets = this.eventForm.controls['availableTickets'].value;
    event.imageE = this.eventForm.controls['imageE'].value;
    event.eventType = this.eventForm.controls['eventType'].value;
    event.eventDate = this.eventForm.controls['eventDate'].value;
    event.ticketPrice = this.eventForm.controls['ticketPrice'].value;



    this.eventService.updateEvent(event, this.idEvent).subscribe(() => {
      this.router.navigate(['back-list']);
    });
  }
}
