import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { content, userId, id, noteContentText } = await request.json();

  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]-(n:Note {id: $id})
    
        SET n.content = $content
        SET n.noteContentText = $noteContentText
        SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})
    
      
        `,
        { userId, id, content, noteContentText }
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
