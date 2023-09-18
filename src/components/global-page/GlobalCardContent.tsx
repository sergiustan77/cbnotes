import React from "react";
import { Element, domToReact } from "html-react-parser";
import parse from "html-react-parser";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Youtube } from "lucide-react";
import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Note from "@/lib/interfaces/Note";
import ImageComponent from "../ImageComponent";
import { cn } from "@/lib/utils";
type Props = {
  note: Note;
};

const GlobalCardContent = ({ note }: Props) => {
  return (
    <div className="overflow-hidden w-full ">
      {parse(note.content, {
        replace: (domNode) => {
          const node = domNode as Element;
          if (node.attribs && node.name === "a") {
            return (
              <span className="underline">{domToReact(node.children)}</span>
            );
          }
          if (node.attribs && node.name === "iframe") {
            let video_id, result, thumbnail;

            if (
              (result = node.attribs.src.match(
                /youtube\.com.*(\?v=|\/embed\/)(.{11})/
              ))
            ) {
              video_id = result.pop();
            } else if ((result = node.attribs.src.match(/youtu.be\/(.{11})/))) {
              video_id = result.pop();
            }
            thumbnail = `https://i.ytimg.com/vi/${video_id}/hq720.jpg`;

            return (
              <div className="relative my-2 w-full">
                <div
                  className={cn(
                    "absolute flex place-content-center  w-[720px] h-[405px] items-center bg-gray-800/30  z-50"
                  )}
                >
                  <Youtube className=" text-white rounded-lg " />
                </div>
                <ImageComponent
                  alt={node.attribs.src}
                  src={thumbnail}
                  width={720}
                  height={300}
                />
              </div>
            );
          }

          if (node.attribs && node.name === "image-resizer") {
            return (
              <ImageComponent
                alt={node.attribs.src}
                src={node.attribs.src.toString()}
                width={
                  parseInt(node.attribs.width)
                    ? parseInt(node.attribs.width)
                    : 300
                }
                height={
                  parseInt(node.attribs.height)
                    ? parseInt(node.attribs.height)
                    : 300
                }
              />
            );
          }
        },
      })}
    </div>
  );
};

export default GlobalCardContent;
