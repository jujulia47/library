export interface Flag {
  // id: string;
  flag: string;
  // created_at: string;
}
export interface Collection {
  // id: String;
  collectionName: string;
  // created_at: String;
}
export interface Quote {
  id: String;
  quote: String;
  quoteId: String;
  created_at: String;
}
export interface Book {
  image: String;
  title: String;
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
