import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createNoteProps } from "../api";

interface NoteDraftStore {
  draft: createNoteProps;
  setDraft: (note: createNoteProps) => void;
  clearDraft: () => void;
}

const initialDraftState: createNoteProps = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraftState,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraftState })),
    }),
    {
      name: "note-draft-storage",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);