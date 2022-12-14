export interface VerseDay {
    book: {
      abbrev:string [],
      name: string,
      author: string,
      group: string,
      version: string
    },
    chapter: number,
    number: number,
    text: string,
}

export interface IVerses {
    book_id: string,
    book_name: string,
    chapter: number,
    verse: number,
    text: string,
}

export interface IBible {
    reference: string,
    verses: [IVerses],
    text: string,
    translation_id: string,
    translation_name: string,
    translation_note:  string,
}


export interface IRequestBible {
    book: string,
    chapter: string,
    verseStart: string,
    verseEnd: string,
    translation: string,
}