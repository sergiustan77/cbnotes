import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Share2 } from "lucide-react";
import LinkedNoteHoverCard from "./LinkedNoteHoverCard";
import { ScrollArea } from "./ui/scroll-area";
type Props = {
  note: string;
  linkedNotesArray: any[];
  userId: string;
  update: boolean;
  setUpdate: Function;
};

const LinkedNotesViewSide = ({
  note,
  userId,
  linkedNotesArray,
  update,
  setUpdate,
}: Props) => {
  const [linkedNotes, setLinkedNotes] = React.useState(linkedNotesArray);

  const setNotes = async () => {
    const res = await fetch(`/api/notes/link?note=${note}&userId=${userId}`);

    const notes = await res.json().then((notes) => {
      setLinkedNotes(notes);
    });
  };

  useEffect(() => {
    setNotes();
  }, [update]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"iconCircle"}>
          <Share2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-[425px] md:max-w-[1080px]  h-[80%] ">
        <DialogHeader className=" ">
          <DialogTitle>Linked Notes</DialogTitle>
          <DialogDescription>
            Hover on each note for more information
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full gap-4 py-4 ">
          {linkedNotes.length && linkedNotes[0].id ? (
            <ScrollArea className="min-h-[100%]  w-full">
              <div className="flex gap-2 flex-wrap h-[100%]">
                {linkedNotes.map((n, i) => (
                  <LinkedNoteHoverCard
                    update={update}
                    setUpdate={setUpdate}
                    note={note}
                    userId={userId}
                    key={i}
                    linkedNote={n}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground ">
              No linked notes found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedNotesViewSide;
