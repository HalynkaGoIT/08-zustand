"use client";

import { useEffect, useMemo, useState } from "react";
import css from "./page.module.css";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";
import type { NoteTag } from "@/types/note";

type Props = {
  tag?: NoteTag | "All";
};

const NoteClient = ({ tag }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  const normalizedTag = useMemo(() => {
    return tag && tag !== "All" ? tag : undefined;
  }, [tag]);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedSearch, normalizedTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 9,
        search: debouncedSearch,
        tag: normalizedTag,
      }),
    placeholderData: keepPreviousData,
  });

  const handleChange = (noteSearch: string) => {
    setSearch(noteSearch.trim());
    setPage(1);
  };

  const notesArr = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handlePageChange = (selected: number) => {
    setPage(selected);
  };

  useEffect(() => {
    if (isSuccess && notesArr.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [isSuccess, notesArr.length]);

  return (
    <div className={css.app}>
      {isSuccess && (
        <div className={css.toolbar}>
          <SearchBox value={search} onChange={handleChange} />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}

          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </div>
      )}

      {notesArr.length !== 0 && <NoteList notes={notesArr} />}

      <Toaster />
    </div>
  );
};

export default NoteClient;