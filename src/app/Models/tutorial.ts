import { TutorialCategory } from "./tutorialCategory";
import { Comment } from "./comment";

import { Level } from "./level";
export class Tutorial {
    tutorialId!: number;
    title!: string;
    description!: string;
    duration!: number;
    video!: string;
    level!: Level;
    tutorialCategory!:TutorialCategory;

    likes: any; 
    dislikes: any;
    comments: Comment[] = [];
    liked!: boolean; // Indique si l'utilisateur a déjà liké cette vidéo
    disliked!: boolean; // Indique si l'utilisateur a déjà disliké cette vidéo
   
   
}
