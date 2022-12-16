import { http } from "../http";
import { IBible, IRequestBible, VerseDay } from "../types";


export async function GetVerse (data: IRequestBible): Promise<IBible>{
  console.log("DATA REQUEST",data.book)
    const response = await http.get(`${data.book}+${data.chapter}:${data.verseStart}-${data.verseEnd}?translation=almeida`);
    return response.data
  }


  export  async function getChapter (book: string, chapter: string): Promise<IBible>{
    const response = await http.get(`${book}+${chapter}?translation=almeida`);
    return response.data
}
export async function getChapterRange (book: string, chapter: string, start: string, end: string): Promise<IBible> {
    const response = await http.get(`${book}+${chapter}:${start}-${end}?translation=almeida`);
    return response.data
}
export async function getMultipleChapters (book: string, chapterStart: string, chapterEnd: string): Promise<IBible> {
    const response = await http.get(`${book}${chapterStart},${chapterStart}?translation=almeida`);
    return response.data
}

export async function getMultipleRanges (book: string, request: string): Promise<IBible> {
    const response = await http.get(`${book}${request}?translation=almeida`);
    return response.data
}
