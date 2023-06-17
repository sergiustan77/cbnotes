import Note from "@/lib/interfaces/Note";

import NoteCard from "./NoteCard";
import { Loader2 } from "lucide-react";

type Props = {
  notes: Note[];
};

const Notes = ({ notes }: Props) => {
  return (
    <div className="w-full mt-6">
      {notes ? (
        notes.length > 0 ? (
          <div className="   w-full h-full flex flex-wrap place-content-start gap-4  ">
            {notes.map((n, i) => (
              <NoteCard key={i} note={n} />
            ))}
          </div>
        ) : (
          <p className=" text-center w-full font-semibold text-muted-foreground p-4 my-2 ">
            No notes found
          </p>
        )
      ) : (
        <div>
          <Loader2 className=" animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Notes;
