import Realm from "realm";

export type dailyPlan = {
  _id?: string;
  books: Realm.List<dailyPlan_books>;
  day?: number;
  month?: number;
  order?: number;
  read?: boolean;
};

export type dailyPlan_books = {
  book?: string;
  chapterEnd?: string;
  chapterStart?: string;
  verseEnd?: string;
  verseStart?: string;
};