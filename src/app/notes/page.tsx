import { auth } from "@clerk/nextjs/server";

import SearchNotes from "@/components/SearchNotes";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Notes from "@/components/Notes";

const getNotes = async (userId: string) => {
  const notes = await prisma.note.findMany({
    where: {
      userId,
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

const NotesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const notes = await getNotes(userId);

  return (
    <div className="container mx-auto mt-4 rounded-md h-auto">
      <div className="my-2 flex-row md:flex w-full h-auto gap-8 ">
        {/* <SearchNotes notes={notes} /> */}
        <Notes notes={notes} />
      </div>
    </div>
  );
};

export default NotesPage;
