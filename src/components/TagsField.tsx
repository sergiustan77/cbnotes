"use client";
import React from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type Props = {
  setTagsToRemove: Function;
  setTags: Function;
  tags: String[];
  tagsToRemove: String[];
};

const TagsField = ({ setTags, tags, setTagsToRemove, tagsToRemove }: Props) => {
  const handleKeyDown = (e: any) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;
    if (!value.trim()) return;

    if (tags?.includes(value)) return;
    if (!tags) {
      setTags([value]);
    } else setTags([...tags, value]);

    e.target.value = "";
  };

  const removeTag = (tag: String, index: number) => {
    setTags(tags?.filter((tag, i) => i !== index));
    setTagsToRemove([...tagsToRemove, tag]);
  };
  return (
    <div className=" p-[0.5em] gap-[0.5em]  flex rounded-md flex-wrap items-center">
      {tags?.map((tag, index) => (
        <Badge
          className=" flex gap-[0.5em]  p-[0.5em] hover:bg-priamry"
          key={index}
        >
          <span className="text pl-1">{tag}</span>
          <Button
            onClick={() => removeTag(tag, index)}
            variant={"iconCircle"}
            size={"iconCircleSmall"}
            className=""
          >
            <X size={12} strokeWidth={2} />
          </Button>
        </Badge>
      ))}
      <Input
        onKeyDown={handleKeyDown}
        type="text"
        className="  border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 px-[0.5em] py-0 w-auto h-auto flex-grow"
        placeholder="Tag your note"
      />
    </div>
  );
};

export default TagsField;
