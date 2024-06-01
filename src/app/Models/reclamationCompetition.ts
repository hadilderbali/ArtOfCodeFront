import { reclamationStatus } from "./reclamationStatus";

export interface ReclamationCompetition {
    reclamationId: number;
    type: string[]; // Liste des types de réclamation
    description: string;
    dateCreation: Date;
   
    reclamationStatus: reclamationStatus;
    sentiment: string; // Ajoutez la propriété 'sentiment'
    
   
}