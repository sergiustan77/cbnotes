"use client";
import React from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  // setTagsToRemove: Function;
  setTags: Function;
  tags: String[];
  // tagsToRemove: String[];
  noteId: string;
  userId: string;
};

const TagsField = ({ noteId, userId, tags, setTags }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const addTag = async (tag: string) => {
    setLoading(true);
    const res = await fetch("/api/notes/tags/tag-note/add", {
      method: "POST",
      body: JSON.stringify({
        noteId: noteId,
        userId: userId as string,
        tag: tag,
      }),
    }).then(() => {
      if (!tags) {
        setTags([tag]);
      } else setTags([...tags, tag]);

      router.refresh();

      setLoading(false);
    });
  };
  const handleKeyDown = async (e: any) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;
    if (!value.trim()) return;

    if (tags?.includes(value)) return;

    await addTag(value);

    e.target.value = "";
  };

  const removeTag = async (tag: String, index: number) => {
    setLoading(true);
    const res = await fetch("/api/notes/tags/tag-note/remove", {
      method: "POST",
      body: JSON.stringify({
        noteId: noteId,
        userId: userId as string,
        tag: tag,
      }),
    }).then(() => {
      setTags(tags?.filter((tag, i) => i !== index));
      router.refresh();

      setLoading(false);
    });

    // setTagsToRemove([...tagsToRemove, tag]);
  };
  return (
    <ScrollArea className="h-20 w-full ">
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
              <X className="" size={12} strokeWidth={2} />
            </Button>
          </Badge>
        ))}
        {!loading ? (
          <Input
            onKeyDown={handleKeyDown}
            type="text"
            className=" border rounded-full w-fit text-center outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 px-[0.5em] py-0  "
            placeholder="Tag your note"
          />
        ) : (
          <Input
            placeholder="Loading..."
            className=" border rounded-full w-fit text-center outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 px-[0.5em] py-0"
            disabled
          />
        )}
      </div>
    </ScrollArea>
  );
};

export default TagsField;
