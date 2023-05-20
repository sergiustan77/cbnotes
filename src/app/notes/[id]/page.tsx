import React from "react";
import { auth } from "@clerk/nextjs";
import { getNote } from "@/lib/note-actions/getNote";
import Note from "@/components/Note";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const { userId } = auth();
  const note = await getNote(id, userId as string);

  if (!note) {
    notFound();
  }

  return (
    <div className="container h-[90vh] my-4">
      <Note note={note} />
    </div>
  );
};

export default page;
