import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { title, content, userId, tags, id, tagsToRemove } =
    await request.json();

  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]-(n:Note {id: $id})
        SET n.title = $title
        SET n.content = $content
        SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})
      WITH n, u
        UNWIND $tags as tag_name
      MERGE (tag:Tag {name: tag_name})
      MERGE (n)-[:TAGGED_IN]->(tag)
      MERGE (u)-[:HAS_TAG]->(tag)
      
        `,
        { userId, id, title, content, tags }
      )
    );

    for (const tag of tagsToRemove) {
      if (!tags.includes(tag)) {
        await session.executeWrite((tx) =>
          tx.run(
            `
      MATCH (n:Note {id: $id})-[r:TAGGED_IN]->(t:Tag {name: $tag})
      DELETE r
  
      `,
            { id, tag }
          )
        );
      }
    }

    await session.close();
    return NextResponse.json({
      status: 200,
      message: "Note updated!",
    });
  } catch (error) {
    await session.close();

    return NextResponse.json({
      status: 500,
      message: "An error occured while updating your note!",
      error: error,
    });
  }
}
