export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

export const tags = ["All", "Work", "Todo", "Personal", "Meeting", "Shopping"];
