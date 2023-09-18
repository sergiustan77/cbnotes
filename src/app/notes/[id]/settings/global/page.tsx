import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import GlobalForm from "./GlobalForm";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { driver } from "@/lib/neo4j";

type Props = {
  params: {
    id: string;
  };
};

const getNote = async (userId: string, noteId: string) => {
  const session = driver.session();
  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n:Note {id: $id})
  
    OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
    OPTIONAL MATCH (n)-[r:LINKED_TO]->(n_link:Note)<-[:HAS_NOTE]-(u)
  WITH COLLECT(DISTINCT t.name) AS tags, n, COLLECT(DISTINCT {title: n_link.title, content: n_link.content, id: n_link.id , updated_at: apoc.date.toISO8601(datetime(n_link.updated_at).epochMillis, "ms"), linkDescription: r.description } ) as linkedNotes 
    RETURN { title: n.title, content: n.content, noteContentText: n.noteContentText, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms"), updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags, isGlobal: n.isGlobal, linkedNotes: linkedNotes} as note`,
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
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Global</h3>
        <p className="text-sm text-muted-foreground">
          Keep your note private or make it available to everyone.
        </p>
      </div>
      <Separator />
      <GlobalForm userId={userId as string} note={note} />
    </div>
  );
};

export default page;
