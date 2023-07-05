import React from "react";

import { auth } from "@clerk/nextjs";

import SearchNotes from "@/components/SearchNotes";
import { driver } from "@/lib/neo4j";

type Props = {};

const getNotes = async (userId: string) => {
  // const notesData = await fetch(
  //   `http://localhost:3000/api/notes?userId=${userId}`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // return await notesData.json();
  const session = driver.session();
  const resNotes = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_NOTE]->(n:Note)
    OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)<-[:HAS_TAG]-(u)
    WITH COLLECT(DISTINCT t.name) AS tags, n
   WITH {title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags} as note
   WITH COLLECT(note) as notes
   OPTIONAL MATCH (u:User {userId: $userId})-[:HAS_TAG]->(t:Tag)
    WITH COLLECT(t.name) as tags, notes
    RETURN {notes: notes, tags: tags} as notes
    `,
      { userId }
    )
  );

  const notes = resNotes.records.map((r) => r.get("notes"));
  await session.close();
  return notes[0];
};

const page = async ({}: Props) => {
  const { userId } = auth();

  const notes: any = await getNotes(userId as string);

  return (
    <div className="container mx-auto mt-4 rounded-md h-auto">
      <div className="my-2 flex-row md:flex w-full h-auto gap-8 ">
        <SearchNotes notes={notes.notes} tags={notes.tags} />
      </div>
    </div>
  );
};

export default page;
