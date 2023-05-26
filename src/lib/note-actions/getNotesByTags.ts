import { driver } from "./../neo4j";
export const getNotesByTags = async (userId: any, tag: string) => {
  const session = driver.session();

  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_TAG]-(t:Tag {name: $tag})<-[:TAGGED_IN]-(n:Note)
      WITH COLLECT(t.name) as tags, n
        RETURN DISTINCT { title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags } as note`,
      { userId, tag }
    )
  );

  session.close();
  const values = res.records.map((r) => r.get("note"));

  return values;
};
