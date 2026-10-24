import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

// без динамічних даних запиту сторінка зібралася б статично під час білду —
// примусово рендеримо її на кожен запит (SSR)
export const dynamic = "force-dynamic";

const Notes = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    // той самий ключ, що в useQuery на клієнті при першому рендері
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes({ page: 1, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
