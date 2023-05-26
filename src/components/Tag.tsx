"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  setFilterTags: Function;
  filterTags: string[];
};

const TagComponent = ({ name, setFilterTags, filterTags }: Props) => {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <Badge
      variant={isSelected ? "default" : "outline"}
      onClick={() => {
        if (!filterTags.includes(name)) {
          if (filterTags.length > 0) {
            setFilterTags([...filterTags, name]);
          } else setFilterTags([name]);
        } else {
          setFilterTags(filterTags.filter((t) => t !== name));
        }
        setIsSelected(!isSelected);
      }}
      className="px-4 py-2 cursor-pointer"
    >
      {name}
    </Badge>
  );
};

export default TagComponent;
