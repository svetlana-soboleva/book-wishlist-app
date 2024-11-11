interface VolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description: string;
  pageCount?: number;
  language: string;
  imageLinks?: {
    smallThumbnail: string;
    large: string;
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

export interface User {
  username: string;
  email: string;
}

export interface LikedBook {
  bookId: string;
}