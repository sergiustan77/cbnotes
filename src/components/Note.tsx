"use client";
import Note from "@/lib/interfaces/Note";
import React from "react";
import { Save, Edit3, X, Trash2, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { updateNote } from "@/lib/note-actions/updateNote";
import { useAuth } from "@clerk/nextjs";
import { Badge } from "./ui/badge";
import TagsField from "./TagsField";
import NoteDropdown from "./NoteDropdown";
import HTMLToReact from "@/lib/htmlToReact";
import Editor from "./editor/Editor";

type Props = {
  note: Note;
  initialTags: string[];
};

const Note = ({ note, initialTags }: Props) => {
  const date = new Date(note.updated_at);
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState(note.content);
  const [title, setTitle] = React.useState(note.title);
  const [tags, setTags] = React.useState<String[]>(initialTags);
  const [tagsToRemove, setTagsToRemove] = React.useState<String[]>([]);
  const { userId } = useAuth();
  const router = useRouter();

  return (
    <Card className="h-fit shadow-none border-none w-full">
      <CardHeader className=" py-4 ">
        <CardDescription className=" flex place-content-between items-end text-xs md:text-sm  ">
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
        </CardDescription>

        <CardTitle className=" flex place-content-between scroll-m-20 text-xl font-extrabold tracking-tight md:text-4xl">
          {!isEditing ? (
            note.title
          ) : (
            <Textarea
              className="mr-4 h-auot md:h-10 resize-none "
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          )}
          {!isEditing ? (
            <NoteDropdown
              userId={userId as string}
              id={note.id}
              setEditing={setIsEditing}
            />
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => {
                  setIsEditing(false);
                  setContent(note.content);
                  setTitle(note.title);
                  setTags(initialTags);
                }}
              >
                <X />
              </Button>
              <Button
                size={"icon"}
                variant={"default"}
                onClick={() => {
                  updateNote(
                    note.id,
                    userId as string,
                    title,
                    content,
                    tags,
                    tagsToRemove
                  ).then(() => {
                    router.refresh();
                    setIsEditing(false);
                  });
                }}
              >
                <Save />
              </Button>
            </div>
          )}
        </CardTitle>

        {!isEditing ? (
          tags && (
            <div className=" flex gap-1">
              {initialTags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>
          )
        ) : (
          <TagsField
            tags={tags}
            setTags={setTags}
            tagsToRemove={tagsToRemove}
            setTagsToRemove={setTagsToRemove}
          />
        )}
      </CardHeader>
      {!isEditing ? (
        <CardContent className="">{HTMLToReact(note.content)}</CardContent>
      ) : (
        <CardContent className="">
          <Editor content={content} setContent={setContent} />
        </CardContent>
      )}
    </Card>
  );
};

export default Note;
