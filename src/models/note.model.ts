export interface NoteModel {
  id?: number;
  title: string;
  content: string;
  charactersCount?: number;
  publishDate?: string;
  userId?: number;
}
