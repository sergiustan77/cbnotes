import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const noteId = params.id;

  const session = driver.session();

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[:HAS_NOTE]->(n:Note {id: $id})

      OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
      OPTIONAL MATCH (n)-[r:LINKED_TO]->(n_link:Note)<-[:HAS_NOTE]-(u)
  WITH COLLECT(DISTINCT t.name) AS tags, n, COLLECT(DISTINCT {title: n_link.title, content: n_link.content, id: n_link.id , updated_at: apoc.date.toISO8601(datetime(n_link.updated_at).epochMillis, "ms"), linkDescription: r.description } ) as linkedNotes 
      RETURN { title: n.title, content: n.content, id: n.id, created_at: apoc.date.toISO8601(datetime(n.created_at).epochMillis, "ms"), updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags, linkedNotes: linkedNotes} as note`,
        { userId, id: noteId }
      )
    );

    await session.close();
    const note = res.records.map((r) => r.get("note"))[0];

    return NextResponse.json(note);
  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error while getting the note!",
      error: error,
    });
  }
}
