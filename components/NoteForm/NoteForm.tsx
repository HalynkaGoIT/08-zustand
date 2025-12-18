"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import css from "./NoteForm.module.css";
import type { CreateNoteRequest, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const NoteForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const mutationPost = useMutation({
    mutationFn: async (formData: FormData) => {
      const newNote: CreateNoteRequest = {
        title: (formData.get("title") as string) ?? "",
        content: (formData.get("content") as string) ?? "",
        tag: ((formData.get("tag") as string) ?? "Todo") as NoteTag,
      };

      return await createNote(newNote);
    },
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note was created");
      router.back();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (formData: FormData) => {
    mutationPost.mutate(formData);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          minLength={3}
          maxLength={50}
          required
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutationPost.isPending}
        >
          {mutationPost.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;