import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { userId, tag, noteId } = await request.json();

  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]-(n:Note {id: $noteId})
        MERGE (u)-[:HAS_TAG]->(t:Tag {name: $tag})
        CREATE (n)-[:TAGGED_IN]->(t)
        `,
        { userId, noteId, tag }
      )
    );

    await session.close();
    return NextResponse.json({
      status: 200,
      message: "Tag added!",
    });
  } catch (error) {
    await session.close();
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "An error occured while adding the tag!",
      error: error,
    });
  }
}
