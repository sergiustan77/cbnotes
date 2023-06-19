import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import parse, { Element, domToReact } from "html-react-parser";
import Link from "next/link";
type Props = {
  linkedNote: any;
  note: string;
  userId: string;
  update: boolean;
  setUpdate: Function;
};
import Image from "next/image";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
const imageLoader = ({ src }: { src: string }) => {
  return src;
};
const LinkedNoteHoverCard = ({
  note,
  userId,
  linkedNote,
  update,
  setUpdate,
}: Props) => {
  const removeLink = async () => {
    const res = await fetch("http://localhost:3000/api/notes/link/remove", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        note: note,
        linkTo: linkedNote.id,
      }),
    }).then(() => {
      setUpdate(!update);
    });
  };
  return (
    <HoverCard>
      <HoverCardTrigger className=" rounded-xl text-xs" asChild>
        <div className="flex gap-0.5 place-content-center items-center">
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-r-none  hover:bg-accent "
            )}
            href={`/notes/${linkedNote.id}`}
          >
            {linkedNote.title}
          </Link>
          <Button
            onClick={removeLink}
            variant="outline"
            size={"iconCircle"}
            className=" rounded-l-none h-10 w-8 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-64 ">
        <div className="space-y-1">{linkedNote.linkDescription}</div>
        <Separator orientation="horizontal" className="my-4 " />
        <ScrollArea className="w-full h-48">
          {parse(linkedNote.content, {
            replace: (domNode) => {
              const node = domNode as Element;
              if (node.attribs && node.name === "a") {
                return (
                  <span className="underline">{domToReact(node.children)}</span>
                );
              }

              if (node.attribs && node.name.startsWith("h")) {
                return <p> {domToReact(node.children)}</p>;
              }
              if (
                node.attribs &&
                (node.name === "image-resizer" || node.name === "img")
              ) {
                return (
                  <Image
                    loader={imageLoader}
                    alt={node.attribs.src}
                    src={node.attribs.src.toString()}
                    width={30}
                    height={30}
                  />
                );
              }
            },
          })}
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LinkedNoteHoverCard;
