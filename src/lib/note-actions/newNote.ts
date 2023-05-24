import { error } from "console";
import { driver } from "../neo4j";

export async function newNote(
  userId: string,
  title: string,
  content: string,
  tags: String[]
) {
  const session = driver.session();
  const id = crypto.randomUUID();
  const resTags = await session.executeWrite((tx) =>
    tx.run(
      `
      MATCH (u:User {userId: $userId})
  UNWIND $tags as tag
  MERGE (t:Tag {name: tag}) 
  MERGE (u)-[:HAS_TAG]->(t)
  RETURN t`,
      { tags, userId }
    )
  );

  const resNote = await session.executeWrite((tx) =>
    tx.run(
      `
      MATCH (u:User {userId: $userId})
      CREATE (n:Note {title: $title, content: $content, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'}), updated_at: datetime({timezone: 'Europe/Bucharest'}) })
      CREATE (u)-[:HAS_NOTE]->(n)
      RETURN n
      `,
      { userId, title, content, id: id }
    )
  );

  for (const tag of tags) {
    await session.executeWrite((tx) =>
      tx.run(
        `MATCH (n:Note {id: $id}), (tag:Tag {name: $tag})
       
      CREATE (n)-[:TAGGED_IN]->(tag)
     `,
        { id: id, tag }
      )
    );
  }

  session.close();
}
