export class Blog{
    idBlog!: number;
    title!: string;
    content!: string;
    url!: string;
    blogCategory!:  BlogCategory;
    createdDate?: Date; 
    imageUrl?: string;
        expanded?: boolean;
    }
    

export enum BlogCategory {

    BALLET='BALLET',
    HIPHOP='HIPHOP',
    BALLROOM='BALLROOM',
    SALSA='SALSA',
    LATINA='LATINA',
    }

