import { http } from "../http";
import { IBible, IRequestBible, VerseDay } from "../types";


export async function getVerse (data: IRequestBible): Promise<IBible>{
    const response = await http.get(`${data.book}+${data.chapter}:${data.verseStart}-${data.verseEnd}?translation=${data.translation}`);
    return response.data
  }
