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

  let query = ` 

  MERGE (u:User {userId: $userId})
  CREATE (n:Note {title: $title, content: $content, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'}), updated_at: datetime({timezone: 'Europe/Bucharest'}) })
      CREATE (u)-[:HAS_NOTE]->(n)
  
  WITH u, n
  UNWIND $tags as tag
  MERGE (u)-[:HAS_TAG]->(t:Tag {name: tag})
  MERGE (t)<-[:TAGGED_IN]-(n)
  `;

  const newNote = await session.executeWrite((tx) =>
    tx.run(query, {
      userId,
      id,
      tags,
      title,
      content,
    })
  );
  // const resTags = await session.executeWrite((tx) =>
  //   tx.run(
  //     `
  //     MATCH (u:User {userId: $userId})
  // UNWIND $tags as tag
  // MERGE (u)-[:HAS_TAG]->(t:Tag {name: tag})
  // RETURN t`,
  //     { tags, userId }
  //   )
  // );

  // const resNote = await session.executeWrite((tx) =>
  //   tx.run(
  //     `MERGE (u:User {userId: $userId})
  //     WITH u
  //     MATCH (u:User {userId: $userId})
  //     CREATE (n:Note {title: $title, content: $content, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'}), updated_at: datetime({timezone: 'Europe/Bucharest'}) })
  //     CREATE (u)-[:HAS_NOTE]->(n)
  //     RETURN n
  //     `,
  //     { userId, title, content, id: id }
  //   )
  // );

  // for (const tag of tags) {
  //   await session.executeWrite((tx) =>
  //     tx.run(
  //       `MATCH (u:userId)-[:HAS_NOTE]->(n:Note {id: $id})
  //       MATCH (u)-[:HAS_TAG]->(tag:Tag {name: $tag})

  //     CREATE (n)-[:TAGGED_IN]->(tag)
  //    `,
  //       { id: id, tag, userId }
  //     )
  //   );
  // }

  session.close();
}
