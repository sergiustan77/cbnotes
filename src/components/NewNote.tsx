"use client";
import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import TagsField from "./TagsField";
import { newNote } from "@/lib/note-actions/newNote";

type Props = {};

const NewNote = ({}: Props) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { userId } = useAuth();
  const [tags, setTags] = React.useState<String[]>([]);
  const [tagsToRemove, setTagsToRemove] = React.useState<String[]>([]);

  const router = useRouter();

  return (
    <Card className="h-fit shadow-none border-none w-full">
      <CardHeader className="py-4 gap-2">
        <CardTitle className="flex place-content-between scroll-m-20 text-xl font-extrabold tracking-tight md:text-4xl">
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
              variant={"default"}
              size={"icon"}
              onClick={() => {
                newNote(userId as string, title, content, tags).then(() => {
                  router.push("/notes");
                  router.refresh();
                });
              }}
            >
              <Save />
            </Button>
          </div>
        </CardTitle>

        <TagsField
          tags={tags}
          tagsToRemove={tagsToRemove}
          setTagsToRemove={setTagsToRemove}
          setTags={setTags}
        />
      </CardHeader>
      <CardContent className="h-[75vh]">
        <Textarea
          className="h-full resize-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Set your heart ablaze!"
        />
      </CardContent>
    </Card>
  );
};

export default NewNote;
