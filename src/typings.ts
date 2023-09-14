export enum Categories {
   ALL = 'all',
   ART = 'art',
   BIOGRAPHY = 'biography',
   COMPUTERS = 'computers',
   HISTORY = 'history',
   MEDICAL = 'medical',
   POETRY = 'poetry',
}

export enum OrderBy {
   RELEVANCE = 'relevance',
   NEWEST = 'newest',
}

export interface GBook {
   id: string | undefined;
   volumeInfo?: {
      categories?: string[] | undefined;
      authors?: string[] | undefined;
      title?: string | undefined;
      description?: string | undefined;
      imageLinks?: {
         thumbnail: string | undefined;
         large: string | undefined;
         extraLarge: string | undefined;
      };
      previewLink?: string | undefined;
      publishedDate?: string | undefined;
   };
}

export interface BookPreview {
   id: string | null;
   category: string | null;
   authors: string[] | null;
   title: string | null;
   imgUrl: string | null;
}

export interface Book {
   id: string | null;
   categories: string[] | null;
   authors: string[] | null;
   title: string | null;
   description: string | null;
   imgUrl: string | null;
}
