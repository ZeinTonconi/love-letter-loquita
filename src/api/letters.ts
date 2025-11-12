import axios from "axios";

export interface Letter {
  id: number;
  title: string;
  content: string;
  quote: string;
  date: string;
}

export const fetchLetters = async (): Promise<Letter[]> => {
  const res = await axios.get<{ letters: Letter[] }>("/db.json");
  return res.data.letters;
};