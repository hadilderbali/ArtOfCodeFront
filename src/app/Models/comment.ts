import { Tutorial } from "./tutorial";
export interface Comment {
    id: number; // Identifiant du commentaire
    tutorialId: number; // Identifiant du tutoriel auquel le commentaire est associé
    content: string; // Contenu du commentaire
    createdAt: Date; // Date de création du commentaire
   
  }