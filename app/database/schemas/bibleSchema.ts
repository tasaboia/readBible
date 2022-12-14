import { ObjectSchema } from "realm";

export const biblePiecesSchema = {
  name: 'biblePieces',
  properties: {
    _id: 'string',
    book: 'string?',
    chapter: 'string?',
    day: 'string?',
    month: 'string?',
    order: 'string?',
    verseEnd: 'string?',
    verseStart: 'string?',
    year: 'string?',
  },
  primaryKey: '_id',
};