"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { Tag, Search, StickyNote } from "lucide-react";
import Note from "@/lib/interfaces/Note";
import Notes from "./Notes";
import { Label } from "./ui/label";
import Tags from "./Tags";
import TagsData from "@/lib/interfaces/TagsData";

type Props = {
  notes: Note[];
  tags: string[];
  tagCount: string;
};

const SearchBar = ({ notes, tags, tagCount }: Props) => {
  const [query, setQuery] = React.useState("");
  const [showTags, setShowTags] = React.useState(false);
  const filterNoteSuggestions = (array: any) => {
    return array.filter(
      (el: any) =>
        el.content.toLowerCase().includes(query.toLocaleLowerCase()) ||
        el.title.toLowerCase().includes(query.toLocaleLowerCase())
    );
  };

  const filterTagSuggestions = (array: any) => {
    return array.filter((el: any) =>
      el.toLowerCase().startsWith(query.toLocaleLowerCase())
    );
  };

  const filteredNotes = filterNoteSuggestions(notes);
  const filteredTags = filterTagSuggestions(tags);
  return (
    <div className="my-2 flex flex-col gap-4 h-full w-full">
      <Label className="relative block w-full">
        <Search
          size={18}
          className="absolute top-1/2 transform -translate-y-1/2 left-2"
        />
        <Input
          className="pl-8"
          id="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={"Search notes or tags"}
        />
      </Label>

      <ScrollArea className="">
        <div className="flex flex-col md:flex-row md:gap-8">
          {tags ? (
            <Tags tags={filteredTags} count={filteredTags.length} />
          ) : (
            <h1>Loading</h1>
          )}
          {notes ? <Notes notes={filteredNotes} /> : <h1>Loading</h1>}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchBar;
