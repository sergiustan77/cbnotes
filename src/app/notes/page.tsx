import React from "react";

import { auth } from "@clerk/nextjs";

import { getNotes } from "@/lib/note-actions/getAllNotes";
import { getTags } from "@/lib/note-actions/getTags";
import Note from "@/lib/interfaces/Note";
import TagsData from "@/lib/interfaces/TagsData";

import SearchBar from "@/components/SearchBarNotes";

type Props = {};

const page = async ({}: Props) => {
  const { userId } = auth();
  const notesData: Promise<Note[]> = getNotes(userId);
  const tagsData: Promise<TagsData> = getTags(userId);

  const [notes, tags] = await Promise.all([notesData, tagsData]);

  return (
    <div className="container mt-4 rounded-md  h-[90vh]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight ">
        All Notes & Tags
      </h1>
      <div className="my-2 flex-row md:flex gap-12">
        <SearchBar
          notes={notes}
          tags={tags.tags}
          tagCount={tags.count.toString()}
        />
      </div>
    </div>
  );
};

export default page;
