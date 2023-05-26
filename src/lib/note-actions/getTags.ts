import { TagIcon } from "lucide-react";
import { driver } from "./../neo4j";
export const getTags = async (userId: any) => {
  const session = driver.session();

  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_TAG]->(t:Tag)
      OPTIONAL MATCH (n:Note)-[:TAGGED_IN]->(t)

      WITH t, COLLECT(n) AS notes
      RETURN {tag: t.name, notes: notes} as tag
           `,
      { userId }
    )
  );

  session.close();
  const tags = res.records.map((r) => r.get("tag"));

  return tags;
};
