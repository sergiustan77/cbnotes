import { driver } from "../neo4j";
import { auth } from "@clerk/nextjs/server";

export async function updateNote(
  id: string,
  userId: string,
  title: string,
  content: string
) {
  const session = driver.session();
  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS]-(n:Note {id: $id})
        SET n.title = $title
        SET n.content = $content
        SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})`,
      { userId, id, title, content }
    )
  );

  session.close();
  const values = res.records.map((r) => r.get("note"))[0];

  return values;
}
