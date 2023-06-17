"use client";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, Tag } from "lucide-react";
import Notes from "@/components/Notes";

import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";

import TagInfo from "@/components/TagInfo";

type Props = {};

const page = (props: Props) => {
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { tag } = useParams();
  const { userId } = useAuth();
  const getNotesByTag = async () => {
    const res = await fetch(
      `http://localhost:3000/api/notes/tags/tag?tag=${decodeURI(
        tag
      )}&userId=${userId}`
    );

    const notesData = await res.json().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    getNotesByTag();
  }, []);

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-4xl w-full flex place-content-between md:flex-row  items-end h-full  mb-2 ">
        <div className="scroll-m-20 text-4xl font-extrabold tracking-tight flex gap-4">
          Tagged in:
          <Badge className="flex items-center gap-2 text-xl">
            <Tag />
            {decodeURI(tag)}
          </Badge>
        </div>

        <div className="text-xl flex gap-4">
          <div className="text-muted-foreground">
            {notes.length > 1 ? (
              <div>{notes.length} notes found</div>
            ) : (
              <div>{notes.length} note found</div>
            )}
          </div>
          <TagInfo userId={userId as string} tag={decodeURI(tag)} />
        </div>
      </h1>
      {loading ? (
        <Loader2 className=" animate-spin" />
      ) : (
        <Notes notes={notes} />
      )}
    </div>
  );
};

export default page;
