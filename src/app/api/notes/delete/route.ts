import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { userId, id } = await request.json();

  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n:Note {id: $id})
         DETACH DELETE n
      `,
        { userId, id }
      )
    );

    await session.close();
    return NextResponse.json({
      status: 200,
      message: "Note deleted!",
    });
  } catch (error) {
    await session.close();
    return NextResponse.json({
      status: 500,
      message: "An error occured while deleting your note!",
      error: error,
    });
  }
}
