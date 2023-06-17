"use client";
import Note from "@/lib/interfaces/Note";
import React from "react";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { useAuth } from "@clerk/nextjs";
import { Badge } from "./ui/badge";
import TagsField from "./TagsField";
import NoteDropdown from "./NoteDropdown";

import Editor from "./editor/Editor";
import HTMLReactParser from "html-react-parser";
import parse, { Element, domToReact } from "html-react-parser";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Integer } from "neo4j-driver";

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
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [link, setLink] = React.useState("");
  const { userId } = useAuth();
  const router = useRouter();

  const updateNote = async () => {
    const res = await fetch("http://localhost:3000/api/notes/update", {
      method: "POST",
      body: JSON.stringify({
        id: note.id,
        userId: userId as string,
        title: title,
        content: content,
        tags: tags,
        tagsToRemove: tagsToRemove,
      }),
    }).then(() => {
      router.refresh();
      setIsEditing(false);
    });
  };

  const imageLoader = ({ src }: { src: string }) => {
    return src;
  };
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
              <Button size={"icon"} variant={"default"} onClick={updateNote}>
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
        <CardContent className="">
          {parse(note.content, {
            replace: (domNode) => {
              const node = domNode as Element;

              if (
                node.attribs &&
                (node.name === "img" || node.name === "image-resizer")
              ) {
                return (
                  <Image
                    loader={imageLoader}
                    alt={node.attribs.src}
                    src={node.attribs.src.toString()}
                    width={parseInt(node.attribs.width) || 300}
                    height={parseInt(node.attribs.height) || 300}
                  />
                );
              }
            },
          })}
        </CardContent>
      ) : (
        <CardContent className="">
          <Editor content={content} setContent={setContent} />
        </CardContent>
      )}
    </Card>
  );
};

export default Note;
