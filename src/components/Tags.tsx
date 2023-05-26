import React from "react";
import { Badge } from "./ui/badge";
import TagsData from "@/lib/interfaces/TagsData";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import TagComponent from "./Tag";

type Props = {
  tags: string[];
  count: string;
  setFilterTags: Function;
  filterTags: string[];
};

const Tags = ({ tags, count, setFilterTags, filterTags }: Props) => {
  return (
    <div className="w-full h-full">
      {tags ? (
        <div className="flex flex-col gap-2">
          {tags.length > 0 ? (
            <ScrollArea className="w-full h-20 min-h-20 max-h-20 md:h-fit md:max-h-fit ">
              <div className=" w-full h-32 min-h-20 max-h-20  md:max-h-32 flex flex-wrap place-content-start gap-1">
                {tags.map((t, i) => (
                  <TagComponent
                    filterTags={filterTags}
                    setFilterTags={setFilterTags}
                    name={t.toString()}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <Badge
              variant={"outline"}
              className=" border-none h-32 min-h-20 max-h-20  md:max-h-32 px-4 py-2 w-full place-content-center text-center text-muted-foreground"
            >
              No tags found
            </Badge>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Tags;
