export interface Version {
  bookVersion: string;
  books: Book[];
}

export interface Status {
  bookStatus: string;
  books: Book[];
  serie: Serie[];
}

export interface Flag {
  flag: string;
  books: Book[];
  serie: Serie[];
}

export interface Collection {
  collectionName: string;
  comments: string;
  initDate: String;
  finishDate: String;
  books: Book[];
  wishlist: Wishlist[];
}

export interface Quote {
  quote: String;
  page: String;
  book: Book;
}

export interface Book {
  image: String;
  title: string;
  serieName: Serie;
  author: String;
  category: String;
  language: String;
  library: Boolean;
  initDate: String;
  finishDate: String;
  status: Status;
  rating: String;
  comments: String;
  pages: String;
  version: Version;
  flags: Flag[];
  quotes: Quote[];
  collections: Collection[];
  wishlist: Wishlist[];
}

export interface Serie {
  serieName: string;
  author: String;
  rating: String;
  initDate: String;
  finishDate: String;
  comments: string;
  books: Book[];
  flags: Flag[];
  wishlist: Wishlist[];
  status: Status[];
}

export interface Wishlist {
  bookTitle: string;
  bookImage: string;
  link: string;
  collections: Collection[];
  serie: Serie[];
}
