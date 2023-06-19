import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import parse, { Element, domToReact } from "html-react-parser";
import Image from "next/image";
import Note from "@/lib/interfaces/Note";

import { cn } from "@/lib/utils";

type Props = {
  linkTo: Note;
  note: string;
  userId: string;
  setSelectedNote: Function;
  selectedNote: Note | undefined;
};

const NoteLink = ({
  linkTo,
  note,
  userId,
  setSelectedNote,
  selectedNote,
}: Props) => {
  const imageLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <Card
      className={cn(
        "w-full  h-64  overflow-hidden hover:border-primary hover:cursor-pointer",
        selectedNote && selectedNote.id === linkTo.id && "border-primary "
      )}
      onClick={() => {
        setSelectedNote(linkTo);

        console.log("New link between: " + linkTo.id + " and " + note);
      }}
    >
      <CardHeader>
        <CardTitle className="">{linkTo.title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden text-xs ">
        <div className="  ">
          {" "}
          {parse(linkTo.content, {
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
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteLink;
