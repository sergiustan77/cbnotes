import { driver } from "../neo4j";

export async function updateNote(
  id: string,
  userId: string,
  title: string,
  content: string,
  tags: String[],
  tagsToRemove: String[]
) {
  const session = driver.session();

  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[:HAS_NOTE]-(n:Note {id: $id})
        SET n.title = $title
        SET n.content = $content
        SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})
      WITH n, u
        UNWIND $tags as tag_name
      MERGE (tag:Tag {name: tag_name})
      MERGE (n)-[:TAGGED_IN]->(tag)
      MERGE (u)-[:HAS_TAG]->(tag)
      
        `,
      { userId, id, title, content, tags }
    )
  );
  console.log(tagsToRemove);
  for (const tag of tagsToRemove) {
    await session.executeWrite((tx) =>
      tx.run(
        `
      MATCH (n:Note {id: $id})-[r:TAGGED_IN]->(t:Tag {name: $tag})
      DELETE r
  
      `,
        { id, tag }
      )
    );
  }
  session.close();
}
