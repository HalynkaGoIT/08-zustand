import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

const debouncedSearch = "";
const page = 1;

const NoteDetails = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  const { slug = [] } = await params;
  const tag = !slug.length || slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
