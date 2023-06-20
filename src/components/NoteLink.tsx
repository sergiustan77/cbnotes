import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import parse, { Element, domToReact } from "html-react-parser";
import Image from "next/image";
import Note from "@/lib/interfaces/Note";

import { cn } from "@/lib/utils";
import { Youtube } from "lucide-react";

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
        <div className=" break-all">
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
                return <p className=""> {domToReact(node.children)}</p>;
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
                  <div className="relative my-2">
                    <div className="absolute flex place-content-center items-center bg-gray-800/30  w-full h-full z-50">
                      <Youtube className=" text-white rounded-lg " />
                    </div>
                    <div className="relative aspect-video rounded-md">
                      {" "}
                      <Image
                        className="rounded-md  "
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
      </CardContent>
    </Card>
  );
};

export default NoteLink;
