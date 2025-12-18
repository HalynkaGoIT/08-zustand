import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CreateNoteRequest } from "@/types/note";

interface NoteDraftStore {
  draft: CreateNoteRequest;
  setDraft: (note: CreateNoteRequest) => void;
  clearDraft: () => void;
}

export const initialDraft: CreateNoteRequest = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);