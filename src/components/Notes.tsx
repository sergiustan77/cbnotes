"use client";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import Link from "next/link";
import Note from "@/lib/interfaces/Note";
import { Badge } from "./ui/badge";
import HTMLToReact from "@/lib/htmlToReact";

type Props = {
  notes: Note[];
};

const Notes = ({ notes }: Props) => {
  return (
    <div className=" w-full  flex flex-col gap-2">
      <div className="flex gap-2 items-cetner place-content-between   scroll-m-20 text-lg font-bold tracking-tight "></div>
      {notes.length > 0 ? (
        <div className="flex  min-h-[70vh] place-content-start flex-wrap gap-4 mb-2  ">
          {notes.map((n) => (
            <Link
              className=" w-full md:w-60 h-72 flex-auto "
              key={n.id}
              href={`/notes/${n.id}`}
            >
              <Card
                className=" hover:border-primary w-full h-full "
                key={n.title}
              >
                <CardHeader>
                  <CardTitle className="flex place-content-between items-center">
                    {n.title}
                  </CardTitle>

                  <CardDescription>
                    {new Date(n.updated_at).toLocaleString("ro-RO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs h-40 overflow-hidden text-ellipsis ">
                    {HTMLToReact(n.content)}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className=" text-center w-full min-h-[70vh] text-muted-foreground p-4 my-2 ">
          No notes found
        </h1>
      )}
    </div>
  );
};

export default Notes;
