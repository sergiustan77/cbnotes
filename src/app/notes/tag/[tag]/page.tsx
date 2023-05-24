import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import Notes from "@/components/Notes";
import { getNotesByTags } from "@/lib/note-actions/getNotesByTags";
import { auth } from "@clerk/nextjs";

type Props = {
  params: {
    tag: string;
  };
};

const page = async ({ params: { tag } }: Props) => {
  const { userId } = auth();

  const notes = await getNotesByTags(userId, decodeURI(tag));
  return (
    <div className="container my-4">
      <h1 className="text-4xl flex gap-4  items-center mb-4 ">
        Tagged in:
        <Badge className="flex items-center gap-2 text-xl">
          <Tag />
          {tag}
        </Badge>
      </h1>
      <Notes notes={notes} />
    </div>
  );
};

export default page;
