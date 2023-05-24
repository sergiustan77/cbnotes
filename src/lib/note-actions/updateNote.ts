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
      `MATCH (u:User {userId: $userId})-[:HAS_TAG]-(:Tag)<-[:TAGGED_IN]-(n:Note {id: $id})
        SET n.title = $title
        SET n.content = $content
        SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})
      WITH n, u
        UNWIND $tags as tag_name
      MERGE (tag:Tag {name: tag_name})
      MERGE (u)-[:HAS_TAG]->(tag)
      MERGE (n)-[:TAGGED_IN]->(tag)
        `,
      { userId, id, title, content, tags }
    )
  );

  session.close();
}
