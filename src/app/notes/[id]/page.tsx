import React from "react";
import { auth } from "@clerk/nextjs";

import Note from "@/components/Note";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const getNote = async (userId: string, noteId: string) => {
  const res = await fetch(`/api/notes/${noteId}?userId=${userId}`);

  return await res.json();
};

const page = async ({ params: { id } }: Props) => {
  const { userId } = auth();
  const note = await getNote(userId as string, id);

  if (!note) {
    notFound();
  }

  return (
    <div className="container mx-auto h-[90vh] my-4">
      <Note note={note} initialTags={note.tags} />
    </div>
  );
};

export default page;
