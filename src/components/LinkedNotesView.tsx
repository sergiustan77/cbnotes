"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import LinkedNoteHoverCard from "./LinkedNoteHoverCard";
import { Link, Share2 } from "lucide-react";

type Props = {
  note: string;
  linkedNotesArray: any[];
  userId: string;
  update: boolean;
  setUpdate: Function;
};

const LinkedNotesView = ({
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
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="item-1">
        <AccordionTrigger className=" ">
          <div className="flex gap-2 items-center">
            <Share2 className="h-4 w-4" />
            <p className=" text-base">Linked Notes</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="">
          {linkedNotes.length && linkedNotes[0].id ? (
            <div className="flex gap-2 flex-wrap">
              {" "}
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
          ) : (
            <div>No linked notes found</div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LinkedNotesView;
