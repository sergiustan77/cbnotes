import { driver } from "../neo4j";

export async function deleteNote(id: string, userId: string) {
  console.log("in delte");
  const session = driver.session();
  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n:Note {id: $id})
         DETACH DELETE n
      `,
      { userId, id }
    )
  );

  session.close();
}
