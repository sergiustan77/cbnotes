import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import Link from "next/link";
import Note from "@/lib/interfaces/Note";

import HTMLToReact from "@/lib/htmlToReact";
import HTMLReactParser from "html-react-parser";
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
            {notes.map((n) => (
              <NoteCard note={n} />
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
