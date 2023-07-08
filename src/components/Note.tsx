"use client";
import Note from "@/lib/interfaces/Note";
import React from "react";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";

import TagsField from "./TagsField";

import Editor from "./editor/Editor";

import LinkNotes from "./LinkNotes";
import LinkedNotesView from "./LinkedNotesView";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import LinkedNotesViewSide from "./LinkedNotesViewSide";

type Props = {
  note: Note;
  initialTags: string[];
};

const Note = ({ note, initialTags }: Props) => {
  const date = new Date(note.updated_at);
  const { userId } = useAuth();
  const router = useRouter();

  const [content, setContent] = React.useState(note.content);
  const [title, setTitle] = React.useState(note.title);
  const [tags, setTags] = React.useState<String[]>(note.tags);

  const [update, setUpdate] = React.useState(false);

  const [noteContentText, setNoteContentText] = React.useState<string>(
    note.noteContentText
  );

  const updateTitle = async (title: string) => {
    const res = await fetch("/api/notes/update/title", {
      method: "POST",
      body: JSON.stringify({
        id: note.id,
        userId: userId,
        title: title,
      }),
    }).then(() => {
      router.refresh();
    });
  };

  const debouncedTitleUpdate = useDebouncedCallback(async (title) => {
    setNoteContentText(noteContentText);
    await updateTitle(title);
    // Simulate a delay in saving.

    setTimeout(() => {}, 500);
  }, 1000);

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
