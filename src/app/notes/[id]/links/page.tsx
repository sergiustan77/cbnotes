import NoteEntity from "@/components/NoteEntity";
import Note from "@/lib/interfaces/Note";
import React from "react";

type Props = {
  note: Note;
};

const page = ({ note }: Props) => {
  return (
    <div>
      <NoteEntity note={note} />
    </div>
  );
};

export default page;
