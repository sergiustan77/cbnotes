import React from "react";
import Notes from "@/components/Notes";
import { sortNotes } from "@/lib/note-actions/sortNotes";
import { auth } from "@clerk/nextjs";

type Props = {};

const page = async (props: Props) => {
  const { userId } = auth();

  const notes = await sortNotes(userId, "title", "DESC", "DESC", [
    "test",
    "lala",
  ]);
  return (
    <div>
      <Notes notes={notes} />
    </div>
  );
};

export default page;
