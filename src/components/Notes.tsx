import { ScrollArea } from "@/components/ui/scroll-area";
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
import { StickyNote } from "lucide-react";

type Props = {
  notes: Note[];
};

const Notes = ({ notes }: Props) => {
  return (
    <div className=" w-full my-2 flex flex-col gap-2">
      <div className="flex gap-2 items-cetner place-content-between   scroll-m-20 text-lg font-bold tracking-tight ">
        <div className="flex items-center text-2xl gap-1 ">
          <StickyNote strokeWidth={2} size={24} /> <h1 className=" ">Notes</h1>
        </div>
        <div className="flex  items-center text-muted-foreground">
          {notes.length} Found
        </div>
      </div>
      {notes.length > 0 ? (
        <div className="flex my-2 flex-wrap gap-4 ">
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
                  <CardTitle>{n.title}</CardTitle>

                  <CardDescription>
                    {new Date(n.created_at).toLocaleString("ro-RO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                  <div className="flex gap-1 flex-wrap items-center ">
                    {n.tags.map((t) => (
                      <Badge className="hover:bg-primary">{t}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">
                    {n.content}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-muted-foreground p-4 my-2 ">
          No notes found
        </h1>
      )}
    </div>
  );
};

export default Notes;
