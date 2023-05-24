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
    <div className="w-auto md:w-[80%] my-2 flex flex-col gap-2">
      <div className="flex gap-2 items-cetner place-content-between   scroll-m-20 text-lg font-bold tracking-tight ">
        <Badge className="flex items-center text-lg gap-1 px-3">
          <StickyNote strokeWidth={3} size={18} />{" "}
          <span className=" ">Notes</span>
        </Badge>
        <div className="flex  items-center gap-8 text-muted-foreground">
          {notes.length} Found
        </div>
      </div>
      {notes.length > 0 ? (
        <ScrollArea className=" h-[70vh]  my-2">
          <div className=" flex gap-4 flex-wrap">
            {notes.map((n) => (
              <Link key={n.id} href={`/notes/${n.id}`}>
                <Card className=" hover:border-primary  " key={n.title}>
                  <CardHeader>
                    <CardTitle>{n.title}</CardTitle>
                    <CardDescription>
                      {new Date(n.created_at).toLocaleString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </CardDescription>
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
        </ScrollArea>
      ) : (
        <h1 className="text-center text-muted-foreground p-4 my-2 ">
          No notes found
        </h1>
      )}
    </div>
  );
};

export default Notes;
