export interface Version {
  bookVersion: string;
}

export interface Status {
  bookStatus: string;
}

export interface Flag {
  flag: string;
}

export interface Collection {
  collectionName: string;
}

export interface Quote {
  id: String;
  quote: String;
  quoteId: String;
  created_at: String;
}

export interface Book {
  image: String;
  title: string;
  serieName: String;
  author: String;
  category: String;
  language: String;
  library: Boolean;
  initDate: String;
  finishDate: String;
  finish: Boolean;
  rating: String;
  flags: Flag[];
  quotes: Quote[];
  collections: Collection[];
}

export interface Serie {
  serieName: string;
  concluded: Boolean;
  abandoned: Boolean;
}

export interface Wishlist {
  // serieName: string;
  // concluded: Boolean;
  // abandoned: Boolean;
}
