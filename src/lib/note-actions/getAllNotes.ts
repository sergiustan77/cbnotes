import { driver } from "./../neo4j";
import { getNoteTags } from "./getNoteTags";
export const getNotes = async (userId: any) => {
  const session = driver.session();

  const resNotes = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_NOTE]->(n:Note)
        RETURN DISTINCT { title: n.title, content: n.content, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms") } as note`,
      { userId }
    )
  );

  session.close();

  const notes = resNotes.records.map((r) => r.get("note"));

  for (const note of notes) {
    const tags = await getNoteTags(note.id);
    note.tags = tags;
  }

  return notes;
};
