import { driver } from "../neo4j";

export default async function likeNote(userId: string, noteId: string) {
  const session = driver.session();

  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})
      MATCH (n:Note {id: $noteId})
      CREATE (u)-[:LIKES]->(n)
      SET n.likes = n.likes + 1

`,
      { userId, noteId }
    )
  );

  await session.close();
}
