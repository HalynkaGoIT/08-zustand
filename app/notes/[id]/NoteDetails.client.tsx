"use client";

import css from "./NoteDetails.module.css";
import style from "@/app/loading.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type NoteDetailsClientProps = {
  id: string;
};

const NoteDetailsClient = ({ id }: NoteDetailsClientProps) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });

  if (isLoading) {
    return <p className={style.text}>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p className={style.text}>Something went wrong.</p>;
  }

  const createdAt = new Date(note.createdAt).toLocaleString("uk-UA");

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{createdAt}</p>
        <p className={css.tag}>{note.tag}</p>

        <button
          className={css.backBtn}
          type="button"
          onClick={() => router.back()}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
