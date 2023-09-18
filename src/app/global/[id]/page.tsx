import Note from "@/lib/interfaces/Note";
import { driver } from "@/lib/neo4j";

import React from "react";
import { Element, domToReact } from "html-react-parser";
import parse from "html-react-parser";

import { Badge } from "@/components/ui/badge";
import ImageComponent from "../../../components/ImageComponent";
type Props = {
  params: {
    id: string;
  };
};

const getNote = async (id: string) => {
  const session = driver.session();
  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User)-[:HAS_NOTE]->(n:Note {id: $id})

      OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
      OPTIONAL MATCH (n)-[r:LINKED_TO]->(n_link:Note)<-[:HAS_NOTE]-(u)
  WITH COLLECT(DISTINCT t.name) AS tags, n, COLLECT(DISTINCT {title: n_link.title, content: n_link.content, id: n_link.id , updated_at: apoc.date.toISO8601(datetime(n_link.updated_at).epochMillis, "ms"), linkDescription: r.description } ) as linkedNotes 
      RETURN { title: n.title, content: n.content, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms"), updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags, linkedNotes: linkedNotes} as note`,
      { id }
    )
  );

  await session.close();
  return res.records.map((r) => r.get("note"))[0];
};

const page = async ({ params: { id } }: Props) => {
  const note: Note = await getNote(id);
  return (
    <div className="container grid gap-4  ">
      <div className="grid gap-1">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {note.title}
        </h1>
        <div className="flex gap-1 flex-wrap">
          {note.tags.map((t, index) => (
            <Badge key={index}>{t}</Badge>
          ))}
        </div>
      </div>
      {parse(note.content, {
        replace: (domNode) => {
          const node = domNode as Element;
          if (node.attribs && node.name === "a") {
            return (
              <span className="underline">{domToReact(node.children)}</span>
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

          if (node.attribs && node.name === "iframe") {
            return (
              <iframe
                className="w-[720px] aspect-video rounded-md"
                src={node.attribs.src}
                allowFullScreen
              ></iframe>
            );
          }
        },
      })}
    </div>
  );
};

export default page;
