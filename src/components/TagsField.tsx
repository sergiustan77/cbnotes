"use client";

import React from "react";

import type Tag from "@/lib/interfaces/Tag";

import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

import { X } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  noteId: string;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

type AddTagResponse = {
  tag?: Tag;
  message?: string;
};

const TagsField = ({ noteId, tags, setTags }: Props) => {
  const [value, setValue] = React.useState("");
  const [isAdding, setIsAdding] = React.useState(false);
  const [removingTagId, setRemovingTagId] = React.useState<string | null>(null);

  const removeTag = async (tag: Tag) => {
    if (removingTagId) {
      return;
    }

    setRemovingTagId(tag.id);

    try {
      const response = await fetch(`/api/notes/${noteId}/tags/${tag.id}`, {
        method: "DELETE",
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove tag");
      }

      setTags((currentTags) =>
        currentTags.filter((currentTag) => currentTag.id !== tag.id),
      );
    } catch (error) {
      console.error("Failed to remove tag:", error);
    } finally {
      setRemovingTagId(null);
    }
  };

  const addTag = async (name: string) => {
    setIsAdding(true);

    try {
      const response = await fetch(`/api/notes/${noteId}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      const data: AddTagResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add tag");
      }

      if (!data.tag) {
        throw new Error("The server did not return a tag");
      }

      setTags((currentTags) => {
        const alreadyAdded = currentTags.some((tag) => tag.id === data.tag?.id);

        if (alreadyAdded || !data.tag) {
          return currentTags;
        }

        return [...currentTags, data.tag].sort((firstTag, secondTag) =>
          firstTag.name.localeCompare(secondTag.name),
        );
      });

      setValue("");
    } catch (error) {
      console.error("Failed to add tag:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== "Enter" || isAdding) {
      return;
    }

    event.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    await addTag(trimmedValue);
  };

  return (
    <ScrollArea className="h-20 w-full">
      <div className="flex flex-wrap items-center gap-2 rounded-md p-2">
        {tags.map((tag) => {
          const isRemoving = removingTagId === tag.id;

          return (
            <Badge key={tag.id} className="flex gap-2 p-2">
              <span className="pl-1">{tag.name}</span>

              <Button
                type="button"
                variant="iconCircle"
                size="iconCircleSmall"
                onClick={() => removeTag(tag)}
                disabled={isRemoving}
                aria-label={`Remove ${tag.name} tag`}
              >
                <X
                  size={12}
                  strokeWidth={2}
                  className={isRemoving ? "opacity-50" : ""}
                />
              </Button>
            </Badge>
          );
        })}

        <Input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAdding}
          className="w-fit rounded-full border px-2 py-0 text-center outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder={isAdding ? "Adding..." : "Tag your note"}
        />
      </div>
    </ScrollArea>
  );
};

export default TagsField;
