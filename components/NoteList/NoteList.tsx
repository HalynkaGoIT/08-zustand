import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note was deleted");
    },
  });

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              onClick={() => handleDelete(note.id)}
              className={css.button}
              type="button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
