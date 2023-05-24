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
    <div className="w-full  my-2">
      {tags ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 mb-2 items-center place-content-between   scroll-m-20 text-md font-bold tracking-tight ">
            <div className="flex items-center text-md gap-1 ">
              <Tag strokeWidth={3} size={18} /> <span className=" ">Tags</span>
            </div>
            <div className="flex  items-center gap-8 text-muted-foreground">
              {count} Found
            </div>
          </div>
          {tags.length > 0 ? (
            <ScrollArea className="  h-min-24 md:h-auto   ">
              <div className="h-full flex flex-wrap gap-1">
                {tags.map((t, i) => (
                  <Link key={i} href={`/notes/tag/${t}`}>
                    <Badge>{t}</Badge>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <h1 className="text-center  min-h-24 md:h-full  text-muted-foreground my-2 ">
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
