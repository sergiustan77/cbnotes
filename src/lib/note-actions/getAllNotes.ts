import { driver } from "./../neo4j";

export const getNotes = async (userId: any) => {
  const session = driver.session();

  const resNotes = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_NOTE]->(n:Note)
      OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
      WITH COLLECT(DISTINCT t.name) AS tags, n
     WITH {title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags} as note
     WITH COLLECT(note) as notes
     OPTIONAL MATCH (t:Tag)
      WITH COLLECT(t.name) as tags, notes
      RETURN {notes: notes, tags: tags} as notes
      `,
      { userId }
    )
  );

  session.close();

  const notes = resNotes.records.map((r) => r.get("notes"));

  return notes;
};
