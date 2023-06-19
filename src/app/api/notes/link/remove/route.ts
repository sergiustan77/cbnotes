import { driver } from "@/lib/neo4j";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, note, linkTo } = await request.json();

  const session = driver.session();

  try {
    const resNotes = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n:Note {id: $noteId})
        MATCH (n)-[r:LINKED_TO]->(n_link:Note {id: $linkTo})<-[:HAS_NOTE]-(u)
        DELETE r
          SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})
          
         RETURN r
     
      `,
        { userId, noteId: note, linkTo }
      )
    );
    const notes = resNotes.records.map((r) => r.get("r"));
    console.log(notes);
    await session.close();
    return NextResponse.json({
      status: 200,
      message: "Removed linked note!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while removing the linked note!",
      error: error,
    });
  }
}
