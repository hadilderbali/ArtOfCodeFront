// message-send-component.component.ts

import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { Subscription } from 'rxjs';

import { WebsocketService } from '../websocket.service';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-send-component',
  templateUrl: './message-send-component.component.html',
  styleUrls: ['./message-send-component.component.css'] // Assurez-vous que le chemin est correct
})

export class MessageSendComponentComponent implements OnInit {
  messages: Message[] = [];
  newMessageSubscription!: Subscription;
  senderId!: number;
  recipientId!: number;
  newMessageContent: string = '';

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute // Injecter ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Récupérer les paramètres userId1 et userId2 de l'URL
    this.route.params.subscribe(params => {
      this.senderId = params['userId1'];
      this.recipientId = params['userId2'];

      // Subscribing to the messageUpdated$ Observable to receive updates when a new message is sent
      this.newMessageSubscription = this.messageService.messageUpdated$.subscribe(() => {
        // When a new message is sent, fetch the updated messages
        this.fetchMessages(this.senderId, this.recipientId);
      });

      // Fetch initial messages when component initializes
      this.fetchMessages(this.senderId, this.recipientId);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription when component is destroyed to avoid memory leaks
    this.newMessageSubscription.unsubscribe();
  }

  fetchMessages(senderId: number, recipientId: number): void {
    // Call the service method to fetch messages between users
    this.messageService.getMessagesBetweenUsers(senderId, recipientId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    // Create a new message object
    const newMessage: Message = {
      senderId: this.senderId, // Utiliser l'ID de l'expéditeur
      recipientId: this.recipientId, // Utiliser l'ID du destinataire
      content: this.newMessageContent
    };
  
    // Call the service method to send the message
    this.messageService.sendMessage(newMessage).subscribe(() => {
      // Announce that a new message is sent
      this.messageService.announceMessageUpdated();
    });
  }
  
}
