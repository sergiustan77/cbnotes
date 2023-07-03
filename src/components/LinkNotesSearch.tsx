"use client";
import React, { useEffect } from "react";

import { Input } from "./ui/input";

import { Search } from "lucide-react";
import Note from "@/lib/interfaces/Note";

import { Label } from "./ui/label";

import NoteLink from "./NoteLink";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  note: Note;
  selectedNote: Note | undefined;
  setSelectedNote: Function;
  userId: string;
  update: boolean;
};

const LinkNotesSearch = ({
  note,
  selectedNote,
  setSelectedNote,
  userId,
  update,
}: Props) => {
  const [notes, setNotes] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [linkedNotes, setLinkedNotes] = React.useState([]);

  const [notesAreLoading, setNotesAreLoading] = React.useState(false);

  const filterNoteSuggestions = (array: Note[]) => {
    return array.filter(
      (el: any) =>
        el.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
        el.content.toLowerCase().includes(query.toLocaleLowerCase())
    );
  };

  const filterAndSortNotes = async () => {
    const allNotes = await fetch(
      `http://localhost:3000/api/notes/link/not-linked?userId=${userId}&note=${note.id}`
    );
    const notesData = await allNotes.json().then((notes) => {
      setNotes(notes);
      setNotesAreLoading(false);
    });
  };

  const getLinkedNotes = async () => {
    const res = await fetch(
      `http://localhost:3000/api/notes/link/not-linked?note=${note.id}&userId=${userId}`
    );

    const notes = await res.json().then((notes) => {
      setLinkedNotes(notes);
    });
  };
  const notesReadyToDisplay = filterNoteSuggestions(notes);

  useEffect(() => {
    filterAndSortNotes();
    getLinkedNotes();
  }, [update]);
  return (
    <div className=" my-4 w-full flex flex-col  gap-4 ">
      {!selectedNote && (
        <Label className="relative block w-full">
          <Search
            size={18}
            className="absolute top-1/2 transform -translate-y-1/2 left-2"
          />
          <Input
            className="pl-8"
            id="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder={"Search in notes"}
          />
        </Label>
      )}

      <div className="w-full ">
        {!notesAreLoading ? (
          !selectedNote ? (
            <ScrollArea className="w-full h-64 overflow-hidden ">
              <div className="w-full flex place-content-center md:place-content-evenly gap-2 flex-wrap">
                {" "}
                {notesReadyToDisplay.map(
                  (n) =>
                    n.id != note.id && (
                      <NoteLink
                        selectedNote={selectedNote}
                        setSelectedNote={setSelectedNote}
                        userId={userId as string}
                        linkTo={n}
                        note={note.id}
                      />
                    )
                )}
              </div>
            </ScrollArea>
          ) : (
            <NoteLink
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
              userId={userId as string}
              linkTo={selectedNote}
              note={note.id}
            />
          )
        ) : (
          <div className="h-64">Loading</div>
        )}
      </div>
    </div>
  );
};

export default LinkNotesSearch;
