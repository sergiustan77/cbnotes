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

import HTMLReactParser, {
  DOMNode,
  Element,
  domToReact,
} from "html-react-parser";
import parse from "html-react-parser";
import { Badge } from "./ui/badge";
import Image from "next/image";

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
          <CardTitle>{note.title}</CardTitle>
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

        <CardContent className="h-55 pb-24 w-full  overflow-hidden flex place-content-start  ">
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

                if (node.attribs && node.name === "image-resizer") {
                  return (
                    <Image
                      loader={imageLoader}
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
