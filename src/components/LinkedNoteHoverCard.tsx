import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Activity, Trash2, Youtube } from "lucide-react";
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
    const res = await fetch("/api/notes/link/remove", {
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
        <div className="space-y-1 grid gap-2">
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" ">
                <div className="flex gap-2 items-center">
                  <Activity className="w-4 h-4" />
                  <p className=" text-base">Link Description</p>
                </div>
              </AccordionTrigger>{" "}
              <AccordionContent className="">
                <ScrollArea className="h-48">
                  <div className="w-full break-all">
                    {linkedNote.linkDescription.toString()}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <ScrollArea className="w-full mt-4 h-48  break-all">
          <h1 className="text-lg">{linkedNote.title}</h1>
          <div className=" ">
            {parse(linkedNote.content, {
              replace: (domNode) => {
                const node = domNode as Element;
                if (node.attribs && node.name === "a") {
                  return (
                    <span className="underline">
                      {domToReact(node.children)}
                    </span>
                  );
                }

                if (node.attribs && node.name.startsWith("h")) {
                  return <p> {domToReact(node.children)}</p>;
                }

                if (node.attribs && node.name === "iframe") {
                  let video_id, result, thumbnail;

                  if (
                    (result = node.attribs.src.match(
                      /youtube\.com.*(\?v=|\/embed\/)(.{11})/
                    ))
                  ) {
                    video_id = result.pop();
                  } else if (
                    (result = node.attribs.src.match(/youtu.be\/(.{11})/))
                  ) {
                    video_id = result.pop();
                  }
                  thumbnail = `https://i.ytimg.com/vi/${video_id}/hq720.jpg`;
                  return (
                    <div className="relative my-2  ">
                      <div className="absolute flex place-content-center items-center bg-gray-800/30  rounded-md w-full h-full z-50">
                        <Youtube className=" text-white rounded-lg " />
                      </div>
                      <div className="relative aspect-video rounded-md">
                        {" "}
                        <Image
                          className="rounded-md   "
                          loader={imageLoader}
                          alt={node.attribs.src}
                          src={thumbnail}
                          fill
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  );
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
                      width={parseInt(node.attribs.width) || 300}
                      height={parseInt(node.attribs.heigth) || 300}
                    />
                  );
                }
              },
            })}
          </div>
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LinkedNoteHoverCard;
