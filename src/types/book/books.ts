export type PartialBook = Partial<Book>

export interface Book {
  uuid: string;
  user: string;
  institution: string;
  title: string;
  author: string;
  editorial: string;
  amount: number;
  state: string;
}
