import { driver } from "../neo4j";

export default async function deleteTag(userId: string, tag: string) {
  const session = driver.session();

  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[:HAS_TAG]->(t:Tag {name: $tag})
        DETACH DELETE t
        `,
      { userId, tag }
    )
  );
}
