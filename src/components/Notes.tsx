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

type Props = {
  notes: Note[];
};

const Notes = ({ notes }: Props) => {
  return (
    <div className="">
      <ScrollArea className=" mt-8 ">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight md:text-4xl">
          Notes
        </h1>
        <div className="mt-4 flex gap-4 flex-wrap">
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
    </div>
  );
};

export default Notes;
