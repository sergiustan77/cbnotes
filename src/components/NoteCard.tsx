import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Note from "@/lib/interfaces/Note";

import Link from "next/link";

import { Element, domToReact } from "html-react-parser";
import parse from "html-react-parser";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Youtube } from "lucide-react";
import ImageComponent from "./ImageComponent";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  const imageLoader = ({ src }: { src: string }) => {
    return src;
  };
  return (
    <Link
      className="flex-auto w-full md:w-64  overflow-hidden h-80 rounded-lg "
      href={`/notes/${note.id}`}
    >
      <Card className="w-full h-80 overflow-hidden hover:border-primary">
        <CardHeader className="h-25">
          <CardTitle className=" text-ellipsis overflow-hidden">
            {note.title}
          </CardTitle>
          <CardDescription>
            {new Date(note.updated_at).toLocaleString("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </CardDescription>

          <div className=" overflow-hidden w-full flex flex-wrap gap-1 h-6">
            {note.tags.map((t, i) => (
              <Badge key={i} className="">
                {t}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="h-55 pb-24 w-full  overflow-hidden break-all flex place-content-start  ">
          <div className="overflow-hidden px-2 h-44 w-full ">
            {parse(note.content, {
              replace: (domNode) => {
                const node = domNode as Element;
                if (node.attribs && node.name === "a") {
                  return (
                    <span className="underline">
                      {domToReact(node.children)}
                    </span>
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
                  } else if (
                    (result = node.attribs.src.match(/youtu.be\/(.{11})/))
                  ) {
                    video_id = result.pop();
                  }
                  thumbnail = `https://i.ytimg.com/vi/${video_id}/hq720.jpg`;
                  return (
                    <div className="relative my-2 w-full">
                      <div className="absolute flex place-content-center items-center bg-gray-800/30  w-full h-full z-50">
                        <Youtube className=" text-white rounded-lg " />
                      </div>
                      <div className=" aspect-video rounded-md">
                        {" "}
                        <ImageComponent
                          className="rounded-md  "
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
                          alt={node.attribs.src}
                          src={thumbnail}
                        />
                      </div>
                    </div>
                  );
                }

                if (node.attribs && node.name === "image-resizer") {
                  return (
                    <ImageComponent
                      alt={node.attribs.src}
                      src={node.attribs.src.toString()}
                      width={parseInt(node.attribs.width) || 300}
                      height={parseInt(node.attribs.height) || 300}
                    />
                  );
                }
              },
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NoteCard;
