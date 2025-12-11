import axios from "axios";
import type { Note, CreateNoteRequest, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = {
    page,
    perPage,
  };

  if (search) params.search = search;
  if (tag && tag !== "all") params.tag = tag;

  const res = await api.get<FetchNotesResponse>("/notes", { params });

  return res.data;
};

export const createNote = async (note: CreateNoteRequest): Promise<Note> => {
  const res = await api.post<Note>("/notes", note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
