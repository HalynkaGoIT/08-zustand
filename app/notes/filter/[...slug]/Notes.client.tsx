"use client";

import { useEffect, useState } from "react";
import css from "./page.module.css";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

const NoteClient = ({ tag }: { tag?: string }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const handleChange = (noteSearch: string) => {
    setSearch(noteSearch.trim());
    setPage(1);
  };

  const notesArr = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (selected: number) => {
    setPage(selected);
  };

  useEffect(() => {
    if (data && notesArr.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data, notesArr.length, isSuccess, debouncedSearch]);

  return (
    <div className={css.app}>
      {isSuccess && (
        <div className={css.toolbar}>
          <SearchBox value={search} onChange={handleChange} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>
      )}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <NoteForm onClose={handleModalClose} />
        </Modal>
      )}
      {data && notesArr.length !== 0 && <NoteList notes={notesArr} />}
      <Toaster />
    </div>
  );
};

export default NoteClient;
