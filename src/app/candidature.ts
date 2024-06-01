import { Competition } from "./competition";
import { Grades } from "./grades";

export class Candidature {
    idCandidacy!:number;
   video!:string;
   username!:string;
   userlastname!:string;
   competitionTitle!:string;
   competition!: Competition; 
   grades!:Grades;
}
