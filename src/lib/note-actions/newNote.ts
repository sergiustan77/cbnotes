import { error } from "console";
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
      `
      MATCH (u:User {userId: $userId})
      CREATE (n:Note {title: $title, content: $content, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'}), updated_at: datetime({timezone: 'Europe/Bucharest'}) })
      WITH u, n
      UNWIND $tags as tag_name
      MERGE (tag:Tag {name: tag_name})
      CREATE (u)-[:HAS_TAG]->(tag)
      MERGE (n)-[:TAGGED_IN]->(tag)
      `,
      { userId, title, content, id: crypto.randomUUID(), tags }
    )
  );
  session.close();
}
