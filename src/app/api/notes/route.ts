import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const session = driver.session();

  try {
    const resNotes = await session.executeRead((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[r:HAS_NOTE]->(n:Note)
    OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
    WITH COLLECT(DISTINCT t.name) AS tags, n
   WITH {title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags} as note
   WITH COLLECT(note) as notes
   OPTIONAL MATCH (u:User {userId: $userId})-[:HAS_TAG]->(t:Tag)
    WITH COLLECT(t.name) as tags, notes
    RETURN {notes: notes, tags: tags} as notes
    `,
        { userId }
      )
    );

    const notes = resNotes.records.map((r) => r.get("notes"));
    await session.close();
    return NextResponse.json(notes[0]);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting the notes!",
    });
  }
}
