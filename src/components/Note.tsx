"use client";
import Note from "@/lib/interfaces/Note";
import React from "react";
import { Save, Edit3 } from "lucide-react";
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
import { Input } from "./ui/input";
import { updateNote } from "@/lib/note-actions/updateNote";
import { useAuth } from "@clerk/nextjs";

type Props = {
  note: Note;
};

const Note = ({ note }: Props) => {
  const date = new Date(note.created_at);
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState(note.content);
  const [title, setTitle] = React.useState(note.title);
  const { userId } = useAuth();
  const router = useRouter();

  return (
    <Card className="h-full shadow-none border-none w-full">
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
            <Input
              className="mr-4"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          )}
          {!isEditing ? (
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <Edit3 />
            </Button>
          ) : (
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                updateNote(note.id, userId as string, title, content).then(
                  () => {
                    router.refresh();
                    setIsEditing(false);
                  }
                );
              }}
            >
              <Save />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      {!isEditing ? (
        <CardContent className="">{note.content}</CardContent>
      ) : (
        <CardContent className="h-[80vh]">
          <Textarea
            className="h-full"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default Note;
