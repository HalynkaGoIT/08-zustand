"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import style from "@/app/loading.module.css";
import Modal from "@/components/Modal/Modal";

const NotePreview = () => {
  const router = useRouter();
  const close = () => router.back();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={style.text}>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button className={css.backBtn} type="button" onClick={close}>
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
