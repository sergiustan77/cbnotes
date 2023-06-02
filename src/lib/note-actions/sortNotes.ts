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

  let query = `MATCH (u:User {userId: $userId})-[r:HAS_NOTE]->(n:Note) `;
  if (tags.length > 0) {
    query += `WHERE ALL(tag IN $tags WHERE (n)-[:TAGGED_IN]->(:Tag {name: tag})) `;
  } else query += "";

  query += `WITH n `;
  if (order === "title") {
    query += `ORDER BY n.title ${title.toUpperCase()}`;
  } else if (order === "updated_at") {
    query += `ORDER BY n.updated_at ${date.toUpperCase()}`;
  } else {
    query += `ORDER BY n.updated_at DESC`;
  }

  query += ` OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
  WITH COLLECT(DISTINCT t.name) AS tags, n
 WITH {title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags} as note
 WITH COLLECT(note) as notes
 RETURN notes`;
  const resNotes = await session.executeRead((tx) =>
    tx.run(query, { userId, tags })
  );

  session.close();

  const notes = resNotes.records.map((r) => r.get("notes"));

  return notes[0];
};
