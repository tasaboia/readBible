import Realm from "realm";
export type biblePieces = {
  _id: string;
  book?: string;
  chapter?: string;
  day?: string;
  month?: string;
  order?: string;
  verseEnd?: string;
  verseStart?: string;
  year?: string;
};