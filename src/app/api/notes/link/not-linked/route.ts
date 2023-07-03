import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const note = searchParams.get("note");

  const session = driver.session();

  try {
    const resNotes = await session.executeRead((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n_link:Note)
       
         WHERE NOT EXISTS((n_link)<-[:LINKED_TO]-(:Note {id: $noteId}))
          WITH COLLECT(DISTINCT {title: n_link.title, content: n_link.content, id: n_link.id , updated_at: apoc.date.toISO8601(datetime(n_link.updated_at).epochMillis, "ms")} ) as linkedNotes 
          RETURN linkedNotes;
          
      `,
        { userId, noteId: note }
      )
    );
    const linkedNotes = resNotes.records.map((r) => r.get("linkedNotes"));

    await session.close();
    return NextResponse.json(linkedNotes[0]);
  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while getting the linked notes!",
      error: error,
    });
  }
}
