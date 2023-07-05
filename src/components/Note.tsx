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

import Editor from "./editor/Editor";

import parse, { Element, domToReact } from "html-react-parser";
import Image from "next/image";

import LinkNotes from "./LinkNotes";
import LinkedNotesView from "./LinkedNotesView";

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
  const [update, setUpdate] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSetUpdate = (value: boolean) => {
    setUpdate(value);
  };

  const { userId } = useAuth();
  const router = useRouter();

  const updateNote = async () => {
    setIsSaved(true);
    const res = await fetch("/api/notes/update", {
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
      setIsSaved(false);
    });
  };

  const imageLoader = ({ src }: { src: string }) => {
    return src;
  };
  return (
    <div className="min-h-[100vh] pb-4  w-full ">
      <div className=" py-4 ">
        <div className=" flex place-content-between items-end text-xs md:text-sm  ">
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

        <h1 className=" flex place-content-between scroll-m-20 text-xl font-extrabold tracking-tight md:text-4xl">
          {!isEditing ? (
            note.title
          ) : (
            <Textarea
              placeholder="Title"
              className="mr-4 h-fit  resize-none text-4xl "
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          )}

          {!isEditing ? (
            <LinkNotes
              update={update}
              setUpdate={handleSetUpdate}
              note={note}
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
                onClick={updateNote}
                disabled={isSaved}
              >
                {!isSaved ? <Save /> : <Loader2 className=" animate-spin" />}
              </Button>
            </div>
          )}
        </h1>

        {!isEditing ? (
          tags && (
            <div className="">
              <div className=" flex flex-wrap gap-1">
                {initialTags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>

              <LinkedNotesView
                update={update}
                setUpdate={handleSetUpdate}
                linkedNotesArray={note.linkedNotes}
                note={note.id}
                userId={userId as string}
              />
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
      </div>
      {!isEditing ? (
        <div className="">
          {parse(note.content, {
            replace: (domNode) => {
              const node = domNode as Element;
              if (node.attribs && node.name === "iframe") {
                return (
                  <div className="w-full  flex place-content-center">
                    <iframe
                      src={node.attribs.src}
                      className="rounded-md aspect-video w-[60%] my-2 bg-gray-400  dark:bg-gray-800 "
                      placeholder="Loading"
                    ></iframe>
                  </div>
                );
              }
              if (node.attribs && node.name === "h1") {
                return (
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {domToReact(node.children)}
                  </h1>
                );
              }

              if (node.attribs && node.name === "h2") {
                return (
                  <h2 className=" scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    {domToReact(node.children)}
                  </h2>
                );
              }
              if (node.attribs && node.name === "h3") {
                return (
                  <h3 className=" scroll-m-20 text-2xl font-semibold tracking-tight">
                    {domToReact(node.children)}
                  </h3>
                );
              }

              if (node.attribs && node.name === "h4") {
                return (
                  <h4 className=" scroll-m-20 text-xl font-semibold tracking-tight">
                    {domToReact(node.children)}
                  </h4>
                );
              }

              if (node.attribs && node.name === "pre") {
                return (
                  <pre className="bg-primary text-background font-mono p-[0.75rem 1rem] rounded-[0.5rem]">
                    {domToReact(node.children)}
                  </pre>
                );
              }

              if (node.attribs && node.name === "code") {
                return (
                  <code className="bg-primary/80 text-background/80 font-mono  rounded-[0.5rem]">
                    {domToReact(node.children)}
                  </code>
                );
              }

              if (node.attribs && node.name === "blockquote") {
                return (
                  <blockquote className="mt-6 border-l-2 pl-6 italic">
                    {domToReact(node.children)}
                  </blockquote>
                );
              }
              if (node.attribs && node.name === "hr") {
                return (
                  <hr className=" border-none border-t-[2px] m-x-[2rem]">
                    {domToReact(node.children)}
                  </hr>
                );
              }

              if (node.attribs && node.name === "a") {
                return (
                  <a
                    href={node.attribs.href}
                    className="underline text-accent-foreground "
                  >
                    {domToReact(node.children)}
                  </a>
                );
              }

              if (node.attribs && node.name === "ul") {
                return (
                  <ul className="py-[1.5rem] list-disc">
                    {domToReact(node.children)}
                  </ul>
                );
              }
              if (node.attribs && node.name === "ol") {
                return (
                  <ol className="py-[1.5rem] list-decimal">
                    {domToReact(node.children)}
                  </ol>
                );
              }

              if (
                node.attribs &&
                (node.name === "img" || node.name === "image-resizer")
              ) {
                return (
                  <Image
                    className="rounded-sm my-2"
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
        </div>
      ) : (
        <div className="w-full ">
          <Editor content={content} setContent={setContent} />
        </div>
      )}
    </div>
  );
};

export default Note;
