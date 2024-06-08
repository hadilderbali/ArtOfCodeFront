import { EventType } from "@angular/router";

export class Event {
    idEvent!: number;
    eventName!: string;
    description!: string;
    city!: string;
    availableTickets!: number;
    ticketPrice!: number;
    eventDate!: Date;
    imageE!: string;
    eventType!: EventType;
    likes!: number;
    dislikes!: number;

}
