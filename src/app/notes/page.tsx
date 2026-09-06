import { auth } from "@clerk/nextjs/server";

import SearchNotes from "@/components/SearchNotes";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Notes from "@/components/Notes";
import { Suspense } from "react";

const getNotes = async (userId: string, query: string) => {
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
    orderBy: {
      updatedAt: "desc",
    },
  });

  return notes.map((note) => {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      noteContentText: note.contentText,
      created_at: note.createdAt.toISOString(),
      updated_at: note.updatedAt.toISOString(),
      tags: [],
      linkedNotes: [],
    };
  });
};

type Props = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

const NotesPage = async ({ searchParams }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const notes = await getNotes(userId, query);

  return (
    <div className="container mx-auto mt-4 rounded-md h-auto">
      <div className="my-2 flex-col md:flex w-full h-auto gap-4 ">
        <Suspense fallback={null}>
          <SearchNotes initialQuery={query} />
        </Suspense>
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
