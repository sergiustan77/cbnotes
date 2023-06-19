import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const tag = searchParams.get("tag");
  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_TAG]->(t:Tag {name: $tag})
        DETACH DELETE t
        `,
        { userId, tag }
      )
    );

    await session.close();

    return NextResponse.json({
      status: 200,
      message: "Tag deleted!",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while deleting the tag!",
    });
  }
}
