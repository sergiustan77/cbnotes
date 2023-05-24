import { driver } from "./../neo4j";
export const getNotes = async (userId: any) => {
  const session = driver.session();

  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_TAG]-(:Tag)<-[:TAGGED_IN]-(n:Note)
        RETURN DISTINCT { title: n.title, content: n.content, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms")  } as note`,
      { userId }
    )
  );

  session.close();
  const values = res.records.map((r) => r.get("note"));

  return values;
};
