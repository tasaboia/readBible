import Realm from "realm";

export const dailyPlanSchema = {
  name: 'dailyPlan',
  properties: {
    _id: 'string?',
    books: 'dailyPlan_books[]',
    day: 'int?',
    month: 'int?',
    order: 'int?',
    read: 'bool?',
  },
  primaryKey: '_id',
};


export const dailyPlan_booksSchema = {
  name: 'dailyPlan_books',
  embedded: true,
  properties: {
    book: 'string?',
    chapterEnd: 'string?',
    chapterStart: 'string?',
    verseEnd: 'string?',
    verseStart: 'string?',
  },
};