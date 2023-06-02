import React from "react";
import { auth } from "@clerk/nextjs";
import { getNote } from "@/lib/note-actions/getNote";
import Note from "@/components/Note";
import { notFound } from "next/navigation";
import { getNoteTags } from "@/lib/note-actions/getNoteTags";
import TagsData from "@/lib/interfaces/TagsData";
import Tag from "@/lib/interfaces/Tag";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const { userId } = auth();
  const notesData: Promise<Note> = await getNote(id, userId as string);
  const tagsData: Promise<string[]> = await getNoteTags(id);
  const [note, tags] = await Promise.all([notesData, tagsData]);

  if (!note) {
    notFound();
  }

  return (
    <div className="container mx-auto h-[90vh] my-4">
      <Note note={note} initialTags={tags} />
    </div>
  );
};

export default page;
