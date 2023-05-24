"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { Tag } from "lucide-react";

type Props = {
  data: any[];
  count: string;
};

const SearchBar = ({ data, count }: Props) => {
  const [query, setQuery] = React.useState("");
  const filterSuggestions = (array: any) => {
    return array.filter((el: any) =>
      el.toLowerCase().startsWith(query.toLocaleLowerCase())
    );
  };

  const filteredSuggestions = filterSuggestions(data);
  return (
    <div className="my-2 md:w-48 md:h-[90vh] flex flex-col gap-4">
      <h4 className="scroll-m-20 text-xl tracking-tight ">
        <span className="font-black">{count.toString()}</span> tags
      </h4>
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder={"Search tags..."}
      />
      <ScrollArea className="h-24 md:h-[70vh] border rounded-md ">
        <div className="flex flex-wrap gap-1 m-4">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((s: any, i: number) => (
              <Link href={`/notes/tag/${s}`} key={i}>
                <Badge className="w-fit text-ellipsis overflow-hidden ">
                  {s}
                </Badge>
              </Link>
            ))
          ) : (
            <h1 className="w-full  text-md font-semibold text-muted-foreground flex place-content-center items-center gap-2">
              <Tag size={20} /> No tags found
            </h1>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchBar;
