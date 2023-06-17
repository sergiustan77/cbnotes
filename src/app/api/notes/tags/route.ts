import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const session = driver.session();

  try {
    const resTags = await session.executeRead((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[r:HAS_TAG]->(t:Tag)
        OPTIONAL MATCH (n:Note)-[:TAGGED_IN]->(t)
  
        WITH t, COLLECT(n) AS notes
        RETURN {tag: t.name, notes: notes} as tag
             `,
        { userId }
      )
    );

    const tags = resTags.records.map((r) => r.get("tag"));
    await session.close();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting the tags!",
    });
  }
}
