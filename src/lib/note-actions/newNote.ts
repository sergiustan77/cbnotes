import { driver } from "../neo4j";

export async function newNote(
  userId: string,
  title: string,
  content: string,
  tags: String[]
) {
  const session = driver.session();
  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})
        CREATE (n:Note {title: $title, content: $content, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'}), updated_at: datetime({timezone: 'Europe/Bucharest'}), tags: $tags })
              CREATE (u)-[:HAS]->(n)
    
      `,
      { userId, title, content, id: crypto.randomUUID(), tags }
    )
  );

  session.close();
}
