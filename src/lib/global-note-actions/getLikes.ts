import { driver } from "../neo4j";

export default async function getLikes(noteId: string) {
  const session = driver.session();

  const res = await session.executeRead((tx) =>
    tx.run(
      `
      MATCH (n:Note {id: $noteId})
     RETURN n.likes as likes
   

`,
      { noteId }
    )
  );
  await session.close();
  return res.records.map((r) => r.get("likes"))[0];
}
