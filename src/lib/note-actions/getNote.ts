import { driver } from "../neo4j";
import { auth } from "@clerk/nextjs/server";

export async function getNote(id: string, userId: string) {
  const session = driver.session();
  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS]-(n:Note {id: $id})
      RETURN { title: n.title, content: n.content, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms") } as note`,
      { userId, id }
    )
  );

  session.close();
  const values = res.records.map((r) => r.get("note"))[0];

  return values;
}
