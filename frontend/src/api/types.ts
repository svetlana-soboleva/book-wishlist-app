interface VolumeInfo {
    title: string;
    authors?: string[];
    publishedDate?: string;
    pageCount?: number;
    imageLinks?: {
      smallThumbnail: string;
    };
  }
  
  export interface Book {
    id: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
  }
  
  export interface ResponseData {
    kind: string;
    totalItems: number;
    items: Book[];
  }
  