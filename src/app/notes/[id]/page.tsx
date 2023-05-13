import React from "react";
import { auth } from "@clerk/nextjs";
import { getNote } from "@/lib/getNote";
import Note from "@/lib/interfaces/Note";
type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const { userId } = auth();
  const note = await getNote(id, userId as string);
  console.log(note);
  return (
    <div className="container">
      {note ? <div>{note.title}</div> : <div>Not Found</div>}
    </div>
  );
};

export default page;
