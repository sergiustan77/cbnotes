import { auth } from "@clerk/nextjs/server";

import Note from "@/components/Note";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

const getNote = async (userId: string, noteId: string) => {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
    include: {
      tagLinks: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!note) {
    return null;
  }

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
};

const NotePage = async ({ params }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const { id } = await params;
  const note = await getNote(userId, id);

  if (!note) {
    notFound();
  }

  return (
    <div className="md:container mx-4 md:mx-auto min-h-[90vh] ">
      <Note note={note} initialTags={note.tags} />
    </div>
  );
};

export default NotePage;
