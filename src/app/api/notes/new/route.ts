import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { title, content, userId, tags } = await request.json();

  const session = driver.session();
  const id = crypto.randomUUID();

  let query = ` 

  MATCH (u:User {userId: $userId})

  CREATE (n:Note {title: $title, content: $content, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'}), updated_at: datetime({timezone: 'Europe/Bucharest'}) })
      CREATE (u)-[:HAS_NOTE]->(n)
  
  WITH u, n
  UNWIND $tags as tag_name
  MERGE (tag:Tag {name: tag_name, user: $userId})<-[:HAS_TAG]-(u)
  MERGE (n)-[:TAGGED_IN]->(tag)
  MERGE (u)-[:HAS_TAG]->(tag)
  `;

  try {
    const newNote = await session.executeWrite((tx) =>
      tx.run(query, {
        userId,
        id,
        tags,
        title,
        content,
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
