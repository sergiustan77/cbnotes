import { driver } from "./../neo4j";
export const getTags = async (userId: any) => {
  const session = driver.session();

  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_TAG]->(t:Tag)
      WITH COUNT(t) as count, COLLECT(t.name) as tags
        RETURN count, tags
           `,
      { userId }
    )
  );

  session.close();
  const values = res.records[0];
  const tagCount = await values.get("count");
  const tagNames = await values.get("tags");

  const tagsObject = {
    tags: tagNames,
    count: tagCount,
  };

  return tagsObject;
};
