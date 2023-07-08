import Note from "@/lib/interfaces/Note";
import React from "react";

type Props = {
  note: Note;
};

const NoteEntity = ({ note }: Props) => {
  return <div className="rounded-full overflow-hidden">{note.title}</div>;
};

export default NoteEntity;
