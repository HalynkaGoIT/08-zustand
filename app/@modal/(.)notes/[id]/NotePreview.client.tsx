"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import style from "@/app/loading.module.css";
import Modal from "@/components/Modal/Modal";

type NotePreviewProps = {
  id: string;
};

const NotePreview = ({ id }: NotePreviewProps) => {
  const router = useRouter();
  const close = () => router.back();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
    staleTime: 60_000,
  });

  if (isLoading) {
    return <p className={style.text}>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p className={style.text}>Something went wrong.</p>;
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
