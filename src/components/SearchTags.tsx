"use client";
import React from "react";

import { Input } from "./ui/input";

import { Tag } from "lucide-react";

import { Label } from "./ui/label";
import Tags from "./Tags";

type Props = {
  filterTags: string[];
  setFilterTags: Function;
  tags: string[];
  tagCount: string;
};

const SearchTags = ({ tags, setFilterTags, filterTags }: Props) => {
  const [query, setQuery] = React.useState("");

  const filterTagSuggestions = (array: any) => {
    return array.filter((el: any) =>
      el.toLowerCase().startsWith(query.toLocaleLowerCase())
    );
  };

  const searchedTags = filterTagSuggestions(tags);
  return (
    <div className="w-full flex flex-col gap-2">
      <Label className=" relative block w-full">
        <Tag
          size={18}
          className="absolute top-1/2 transform -translate-y-1/2 left-2"
        />
        <Input
          className=" pl-8 border-none  outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
          id="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={"Search tags"}
        />
      </Label>

      <div className="flex flex-wrap md:flex-row gap-8">
        {tags ? (
          <div className="w-full  ">
            <Tags
              filterTags={filterTags}
              setFilterTags={setFilterTags}
              tags={searchedTags}
              count={searchedTags.length}
            />
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default SearchTags;
