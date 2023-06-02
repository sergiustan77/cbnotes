import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import Notes from "@/components/Notes";
import { getNotesByTags } from "@/lib/note-actions/getNotesByTags";
import { auth } from "@clerk/nextjs";

import TagInfo from "@/components/TagInfo";

type Props = {
  params: {
    tag: string;
  };
};

const page = async ({ params: { tag } }: Props) => {
  const { userId } = auth();

  const notes = await getNotesByTags(userId, decodeURI(tag));
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
      <Notes notes={notes} />
    </div>
  );
};

export default page;
