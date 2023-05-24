import { driver } from "../neo4j";

export async function removeTagsFromNote(
  id: string,
  userId: string,
  tags: string[]
) {
  const session = driver.session();

  const res = await session.executeWrite((tx) =>
    tx.run(
      `
    
      UNWIND $tags as tag_name
      MATCH (u:User {userId: $userId})-[:HAS_TAG]-(t:Tag {name: tag_name})<-[r:TAGGED_IN]-(n:Note {id: $id})
      DELETE r
        `,
      { userId, id, tags }
    )
  );

  session.close();
}
