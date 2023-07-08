import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { title, content, userId, noteContentText, id } = await request.json();

  const session = driver.session();

  let query = ` 

  MATCH (u:User {userId: $userId})

  CREATE (n:Note {title: $title, content: $content, noteContentText: $noteContentText, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'}), updated_at: datetime({timezone: 'Europe/Bucharest'}) })
      CREATE (u)-[:HAS_NOTE]->(n)
  

  `;

  try {
    const newNote = await session.executeWrite((tx) =>
      tx.run(query, {
        userId,
        id,
        title,
        content,
        noteContentText,
      })
    );

    await session.close();
    return NextResponse.json({
      status: 200,
      message: "Note created!",
    });
  } catch (error) {
    await session.close();
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "An error occured while creating your note!",
      error: error,
    });
  }
}
