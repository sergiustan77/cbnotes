"use client";
import type NoteType from "@/lib/interfaces/Note";
import React from "react";

import { useAuth } from "@clerk/nextjs";

import TagsField from "./TagsField";

import Editor from "./editor/Editor";

import LinkNotes from "./LinkNotes";
import LinkedNotesView from "./LinkedNotesView";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  note: NoteType;
  initialTags: string[];
};

const Note = ({ note, initialTags }: Props) => {
  const date = new Date(note.updated_at);
  const { userId } = useAuth();

  const [content, setContent] = React.useState(note.content);
  const [title, setTitle] = React.useState(note.title);
  const [tags, setTags] = React.useState<String[]>(note.tags);

  const [update, setUpdate] = React.useState(false);

  const [noteContentText, setNoteContentText] = React.useState<string>(
    note.noteContentText,
  );

  const updateTitle = async (title: string) => {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to update title");
    }
  };

  const debouncedTitleUpdate = useDebouncedCallback(
    async (nextTitle: string) => {
      try {
        await updateTitle(nextTitle);
      } catch (error) {
        console.error("Failed to update title:", error);
      }
    },
    500,
  );

  const handleSetUpdate = (value: boolean) => {
    setUpdate(value);
  };

  return (
    <div className="min-h-[100vh] pb-4  w-full ">
      <div className=" py-4 ">
        <div className=" flex place-content-between items-end text-xs md:text-sm  text-muted-foreground ">
          {date.toLocaleString("ro-RO", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          at{" "}
          {date.toLocaleString("ro-RO", {
            hour: "numeric",
            minute: "numeric",
          })}
        </div>

        <div className=" flex place-content-between gap-12 items-center scroll-m-20 text-xl font-extrabold tracking-tight md:text-4xl">
          <Input
            placeholder="Title"
            className="h-16 text-4xl "
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              debouncedTitleUpdate(e.target.value);
            }}
          />{" "}
          <LinkNotes update={update} setUpdate={handleSetUpdate} note={note} />
        </div>

        <div className="mt-2">
          {" "}
          <TagsField
            setTags={setTags}
            tags={tags}
            userId={userId as string}
            noteId={note.id}
          />
        </div>

        <LinkedNotesView
          note={note.id}
          linkedNotesArray={note.linkedNotes}
          update={update}
          setUpdate={setUpdate}
          userId={userId as string}
        />
      </div>

      <div className="w-full ">
        <Editor
          userId={userId as string}
          noteId={note.id}
          setNoteContentText={setNoteContentText}
          content={content}
          setContent={setContent}
        />
      </div>
    </div>
  );
};

export default Note;
