import { auth } from "@clerk/nextjs/server";

import SearchNotes from "@/components/SearchNotes";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Notes from "@/components/Notes";
import { Suspense } from "react";
import {
  DEFAULT_NOTE_SORT,
  isNoteSort,
  NOTE_SORT_OPTIONS,
  type NoteSort,
} from "@/lib/note-sort";
import SortFilter from "@/components/SortFilter";

const getNotes = async (userId: string, query: string, sort: NoteSort) => {
  const notes = await prisma.note.findMany({
    where: {
      userId,
      ...(query
        ? {
            OR: [
              {
                title: { contains: query, mode: "insensitive" as const },
              },
              {
                contentText: { contains: query, mode: "insensitive" as const },
              },
            ],
          }
        : {}),
    },
    include: {
      tagLinks: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: NOTE_SORT_OPTIONS[sort],
  });

  return notes.map((note) => {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      noteContentText: note.contentText,
      created_at: note.createdAt.toISOString(),
      updated_at: note.updatedAt.toISOString(),
      tags: note.tagLinks
        .map((link) => ({
          id: link.tag.id,
          name: link.tag.name,
        }))
        .sort((first, second) => first.name.localeCompare(second.name)),
      linkedNotes: [],
    };
  });
};

type Props = {
  searchParams: Promise<{
    q?: string | string[];
    sort?: string | string[];
  }>;
};

const NotesPage = async ({ searchParams }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const { q, sort } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const selectedSort = isNoteSort(sort) ? sort : DEFAULT_NOTE_SORT;
  const notes = await getNotes(userId, query, selectedSort);

  return (
    <div className="container mx-auto mt-4 rounded-md h-auto">
      <div className="my-2 flex-col md:flex w-full h-auto gap-4 ">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Suspense fallback={null}>
              <SearchNotes initialQuery={query} />
            </Suspense>
          </div>

          <Suspense fallback={null}>
            <SortFilter initialSort={selectedSort} />
          </Suspense>
        </div>
        <p className="text-sm text-muted-foreground ">
          {notes.length} {notes.length === 1 ? "note" : "notes"} found
        </p>
        {notes.length > 0 ? (
          <Notes notes={notes} />
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            {query
              ? `No notes match "${query}".`
              : "You don't have any notes yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
