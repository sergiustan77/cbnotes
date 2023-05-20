import { driver } from "../neo4j";

export async function updateNote(
  id: string,
  userId: string,
  title: string,
  content: string,
  tags: String[]
) {
  const session = driver.session();
  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS]-(n:Note {id: $id})
        SET n.title = $title
        SET n.content = $content
        SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})
        SET n.tags = $tags`,
      { userId, id, title, content, tags }
    )
  );

  session.close();
}
