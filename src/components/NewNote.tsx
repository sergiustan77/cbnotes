"use client";
import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import TagsField from "./TagsField";
import Editor from "@/components/editor/Editor";

type Props = {};

const NewNote = ({}: Props) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState<string>("");
  const { userId } = useAuth();
  const [tags, setTags] = React.useState<String[]>([]);
  const [tagsToRemove, setTagsToRemove] = React.useState<String[]>([]);
  const [isSaved, setIsSaved] = React.useState(false);

  const router = useRouter();

  const newNote = async () => {
    setIsSaved(true);
    const res = await fetch("/api/notes/new", {
      method: "POST",
      body: JSON.stringify({
        userId: userId as string,
        title: title,
        content: content,
        tags: tags,
      }),
    }).then(() => {
      router.push("/notes");
      router.refresh();
    });
  };

  return (
    <div className="h-fit  border-none w-full ">
      <div className="py-4 gap-2">
        <h1 className="flex place-content-between scroll-m-20 text-xl font-extrabold tracking-tight md:text-4xl">
          <Textarea
            className="mr-4 h-auto md:h-10 resize-none"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          />

          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                router.push("/notes");
              }}
            >
              <X />
            </Button>
            <Button
              disabled={isSaved}
              variant={"default"}
              size={"icon"}
              onClick={newNote}
            >
              {!isSaved ? <Save /> : <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </h1>

        <TagsField
          tags={tags}
          tagsToRemove={tagsToRemove}
          setTagsToRemove={setTagsToRemove}
          setTags={setTags}
        />
      </div>
      <div className="w-full ">
        <Editor content={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default NewNote;
