import { driver } from "./../neo4j";
export const getNoteTags = async (id: any) => {
  const session = driver.session();

  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (n:Note {id: $id})-[:TAGGED_IN]->(t:Tag)
      WITH COUNT(t) as count, COLLECT(t.name) as tags
        RETURN DISTINCT count, tags
           `,
      { id }
    )
  );

  const values = res.records[0];
  // const tagCount = await values.get("count");
  const tagNames = await values.get("tags");
  session.close();
  // const tagsObject = {
  //   tags: tagNames,
  //   count: tagCount,
  // };

  return tagNames;
};
