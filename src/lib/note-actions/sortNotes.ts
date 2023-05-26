import { driver } from "./../neo4j";
import { getNoteTags } from "./getNoteTags";
export const sortNotes = async (
  userId: any,

  order: string,
  date: string,
  title: string,
  tags: string[]
) => {
  const session = driver.session();

  let query = `MATCH (u:User {userId: $userId})-[r:HAS_NOTE]->(n:Note)`;
  if (tags.length > 0) {
    query += `-[:TAGGED_IN]->(t:Tag) WHERE t.name in [`;
    tags.map((t, i) =>
      i < tags.length - 1 ? (query += `"${t}",`) : (query += `"${t}"`)
    );
    query += `]`;
  }

  query += ` WITH COLLECT(DISTINCT t.name) AS tags, n, t `;
  if (order === "title") {
    query += `ORDER BY n.title ${title.toUpperCase()}`;
  } else if (order === "updated_at") {
    query += `ORDER BY n.updated_at ${date.toUpperCase()}`;
  } else {
    query += `ORDER BY n.updated_at DESC`;
  }

  query += ` WITH COLLECT({title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags}) AS notes, COLLECT(DISTINCT t.name) as tags RETURN DISTINCT { notes: notes, tags: tags} as notesData`;
  const resNotes = await session.executeRead((tx) => tx.run(query, { userId }));

  session.close();

  const notes = resNotes.records.map((r) => r.get("notesData"));
  console.log(notes[0].notes);

  return notes;
};
