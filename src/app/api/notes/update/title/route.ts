import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { title, userId, id } = await request.json();

  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]-(n:Note {id: $id})
    
        SET n.title = $title
      
    
      
        `,
        { userId, id, title }
      )
    );

    await session.close();
    return NextResponse.json({
      status: 200,
      message: "Note updated!",
    });
  } catch (error) {
    await session.close();
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "An error occured while updating your note!",
      error: error,
    });
  }
}
