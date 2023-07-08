import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { userId, tags, noteId, tagsToRemove } = await request.json();

  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]-(n:Note {id: $noteId})
        WITH n, u
        UNWIND $tags as tag_name
        MERGE (tag:Tag {name: tag_name, user: $userId})<-[:HAS_TAG]-(u)
      MERGE (n)-[:TAGGED_IN]->(tag)
        `,
        { userId, noteId, tags }
      )
    );

    for (const tag of tagsToRemove) {
      if (!tags.includes(tag)) {
        await session.executeWrite((tx) =>
          tx.run(
            `
        MATCH (n:Note {id: $noteId})-[r:TAGGED_IN]->(t:Tag {name: $tag})
        DELETE r
    
        `,
            { noteId, tag }
          )
        );
      }
    }

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
      message: "An error occured while adding/deleting the tag note!",
      error: error,
    });
  }
}
