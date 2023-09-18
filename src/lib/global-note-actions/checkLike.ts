import { driver } from "../neo4j";

export default async function checkLike(userId: string, noteId: string) {
  const session = driver.session();
  const res = await session.executeRead((tx) =>
    tx.run(
      `RETURN EXISTS( (:User {userId: $userId})-[:LIKES]-(:Note {id: $noteId}) ) as isLiked

`,
      { userId, noteId }
    )
  );
  await session.close();
  return res.records.map((r) => r.get("isLiked"))[0];
}
