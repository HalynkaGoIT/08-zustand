import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface Props {
  params: { slug?: string[] };
}

const debouncedSearch = "";
const page = 1;

function getTagFromSlug(slug?: string[]): "All" | NoteTag {
  const first = slug?.[0];

  if (!first) return "All";

  if (first === "All") return "All";

  return first as NoteTag;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = getTagFromSlug(params.slug);

  const title =
    tag === "All" ? "All Notes | NoteHub" : `Notes: ${tag} | NoteHub`;

  const description =
    tag === "All"
      ? "Browse all notes in NoteHub."
      : `Browse notes filtered by "${tag}" in NoteHub.`;

  const url =
    tag === "All"
      ? "https://08-zustand-murex-two.vercel.app/notes/filter"
      : `https://08-zustand-murex-two.vercel.app/notes/filter/${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function NotesFilterPage({ params }: Props) {
  const queryClient = new QueryClient();

  const tag = getTagFromSlug(params.slug);
  const normalizedTag = tag === "All" ? undefined : tag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, debouncedSearch, normalizedTag],
    queryFn: () =>
      fetchNotes({ search: debouncedSearch, page, tag: normalizedTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
}
