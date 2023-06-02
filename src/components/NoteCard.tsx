import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Note from "@/lib/interfaces/Note";
import HTMLToReact from "@/lib/htmlToReact";
import Link from "next/link";
import { Suspense } from "react";
import HTMLReactParser, { domToReact } from "html-react-parser";
import { Badge } from "./ui/badge";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  return (
    <Link
      className="flex-auto w-full md:w-64  overflow-hidden h-80 rounded-lg "
      href={`/notes/${note.id}`}
    >
      <Suspense fallback={"loading"}>
        <Card className="w-full h-80 hover:border-primary">
          <CardHeader className="h-25">
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>
              {new Date(note.updated_at).toLocaleString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </CardDescription>

            <div className=" overflow-hidden w-full flex flex-wrap gap-1 h-6">
              {note.tags.map((t) => (
                <Badge className="">{t}</Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="h-55 pb-24 w-full  overflow-hidden flex place-content-start  ">
            <div className="overflow-hidden px-2 h-44 w-full ">
              {HTMLToReact(note.content)}
            </div>
          </CardContent>
        </Card>
      </Suspense>
    </Link>
  );
};

export default NoteCard;
