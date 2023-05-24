import React from "react";
import { Badge } from "./ui/badge";
import TagsData from "@/lib/interfaces/TagsData";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { Tag } from "lucide-react";

type Props = {
  tags: string[];
  count: string;
};

const Tags = ({ tags, count }: Props) => {
  return (
    <div className="w-auto md:w-[20%]  my-2">
      {tags ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-cetner place-content-between   scroll-m-20 text-lg font-bold tracking-tight ">
            <Badge className="flex items-center text-lg gap-1 px-3">
              <Tag strokeWidth={3} size={18} /> <span className=" ">Tags</span>
            </Badge>
            <div className="flex  items-center gap-8 text-muted-foreground">
              {count} Found
            </div>
          </div>
          {tags.length > 0 ? (
            <ScrollArea className="border rounded-md h-24 md:h-[70vh]  my-2 ">
              <div className="h-full p-4 flex flex-wrap gap-1">
                {tags.map((t, i) => (
                  <Link key={i} href={`/notes/tag/${t}`}>
                    <Badge>{t}</Badge>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <h1 className="text-center border h-24 md:h-[70vh] p-4 rounded-md text-muted-foreground my-2 ">
              No tags found
            </h1>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Tags;
