export class JobOffer {
    idR!: number;
    title!: string;
    location!: string;
    number!: number;
    description!: string;
    datePost!: Date;
    email!: string;
    salaryRange!: number;
    jobType!: Type;
    fileName!: string;
  }
  
  export enum Type {
    FULL = 'FULL',
    PART = 'PART',
    CONTRACT = 'CONTRACT',
    TEMPORARY = 'TEMPORARY',
    INTERNSHIP = 'INTERNSHIP',
  }