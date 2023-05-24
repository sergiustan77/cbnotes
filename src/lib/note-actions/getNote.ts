import { driver } from "../neo4j";
import { auth } from "@clerk/nextjs/server";

export async function getNote(id: string, userId: string) {
  const session = driver.session();
  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[:HAS_TAG]->(t:Tag)<-[:TAGGED_IN]-(n:Note {id: $id})
      WITH COLLECT(t.name) as tags, n
      RETURN { title: n.title, content: n.content, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms"), updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags } as note`,
      { userId, id }
    )
  );

  session.close();
  const values = res.records.map((r) => r.get("note"))[0];

  return values;
}
