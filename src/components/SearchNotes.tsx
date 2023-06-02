"use client";
import React, { useEffect } from "react";

import { Input } from "./ui/input";

import { Search, Plus, Tag, Loader2 } from "lucide-react";
import Note from "@/lib/interfaces/Note";
import Notes from "./Notes";
import { Label } from "./ui/label";
import TagFilter from "./TagFilter";
import SortFilter from "./SortFilter";
import sortNoteInClient from "@/lib/note-actions/sortNotesinClient";
import Link from "next/link";
import SearchTags from "./SearchTags";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Suspense } from "react";
import { sortNotes } from "@/lib/note-actions/sortNotes";
import { useAuth } from "@clerk/nextjs";
type Props = {
  notes: Note[];
  tags: string[];
};

const SearchNotes = ({ notes, tags }: Props) => {
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("default");
  const [date, setDate] = React.useState("DESC");
  const [title, setTitle] = React.useState("ASC");
  const [filter, setFilter] = React.useState("all");
  const [filterTags, setFilterTags] = React.useState<string[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const [displayedNotes, setDisplayedNotes] = React.useState(notes);
  const { userId } = useAuth();

  const filterNoteSuggestions = (array: Note[]) => {
    return array.filter(
      (el: any) =>
        el.content.toLowerCase().includes(query.toLocaleLowerCase()) ||
        el.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
        el.tags.some((t: any) => t.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filterAndSortNotes = async () => {
    const filteredAndSortedNotes = await sortNotes(
      userId,
      sortBy,
      date,
      title,
      filterTags
    );

    const notesReadyToDisplay = filterNoteSuggestions(filteredAndSortedNotes);
    setDisplayedNotes(notesReadyToDisplay);
    if (filter === "all") {
      setFilterTags([]);
    }
  };
  useEffect(() => {
    setMounted(true);

    filterAndSortNotes();
  }, [date, title, filterTags, sortBy, filter]);
  return (
    <div className=" my-4 w-full flex flex-col  gap-2  ">
      {mounted ? (
        <>
          <div className="flex w-full place-content-between items-center gap-1">
            <div className="flex gap-1 scroll-m-20 text-2xl             font-semibold tracking-tight items-end">
              {" "}
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight  ">
                All Notes
              </h1>
            </div>
            <div className="flex items-end gap-2 ">
              <div className="flex gap-2 items-end">
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                    }),
                    "flex gap-1"
                  )}
                  href={`/notes/new-note`}
                >
                  <Plus className="h-4 w-4" /> New
                </Link>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "icon",
                    })
                  )}
                  href={`/notes/tags`}
                >
                  <Tag />
                </Link>
                <TagFilter filter={filter} setFilter={setFilter} />
                <SortFilter
                  date={date}
                  sortBy={sortBy}
                  setDate={setDate}
                  setSortBy={setSortBy}
                  title={title}
                  setTitle={setTitle}
                />
              </div>
              <div className="text-lg w-20  flex place-content-end">
                {" "}
                {displayedNotes.length} found
              </div>
            </div>
          </div>

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
              placeholder={"Search in notes"}
            />
          </Label>
          {filter === "by_tags" && (
            <div className="border rounded-md p-4">
              <SearchTags
                filterTags={filterTags}
                setFilterTags={setFilterTags}
                tags={tags}
                tagCount={tags.length.toString()}
              />
            </div>
          )}

          <div className="w-full min-h-[70vh]">
            {displayedNotes ? <Notes notes={displayedNotes} /> : "Loading"}
          </div>
        </>
      ) : (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default SearchNotes;
