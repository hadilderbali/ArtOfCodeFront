// message.model.ts

export interface Message {
  id?: number;
    senderId: number;
    recipientId: number;
  content: string;
 }
