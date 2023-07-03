import React from "react";
import { auth } from "@clerk/nextjs";

import Note from "@/components/Note";
import { notFound } from "next/navigation";
import { driver } from "@/lib/neo4j";

type Props = {
  params: {
    id: string;
  };
};

const getNote = async (userId: string, noteId: string) => {
  // const res = await fetch(`/api/notes/${noteId}?userId=${userId}`);

  // return await res.json();

  const session = driver.session();
  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n:Note {id: $id})

  OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
  OPTIONAL MATCH (n)-[r:LINKED_TO]->(n_link:Note)<-[:HAS_NOTE]-(u)
WITH COLLECT(DISTINCT t.name) AS tags, n, COLLECT(DISTINCT {title: n_link.title, content: n_link.content, id: n_link.id , updated_at: apoc.date.toISO8601(datetime(n_link.updated_at).epochMillis, "ms"), linkDescription: r.description } ) as linkedNotes 
  RETURN { title: n.title, content: n.content, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms"), updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags, linkedNotes: linkedNotes} as note`,
      { userId, id: noteId }
    )
  );

  await session.close();
  const note = res.records.map((r) => r.get("note"))[0];
  return note;
};

const page = async ({ params: { id } }: Props) => {
  const { userId } = auth();
  const note = await getNote(userId as string, id);

  if (!note) {
    notFound();
  }

  return (
    <div className="container mx-auto h-[90vh] my-4">
      <Note note={note} initialTags={note.tags} />
    </div>
  );
};

export default page;
