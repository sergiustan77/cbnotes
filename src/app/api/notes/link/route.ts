import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  const { userId, note, linkTo, linkDescription } = await request.json();

  const session = driver.session();

  try {
    const resNotes = await session.executeWrite((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[r:HAS_NOTE]->(n:Note {id: $noteId})
     
        SET n.updated_at = datetime({timezone: 'Europe/Bucharest'})
        WITH n
        MATCH (u)-[:HAS_NOTE]->(n_link:Note {id: $linkToId})
        MERGE (n)-[:LINKED_TO {description: $linkDescription}]->(n_link)
   
    `,
        { userId, noteId: note, linkToId: linkTo.id, linkDescription }
      )
    );

    await session.close();
    return NextResponse.json({
      status: 200,
      message: "Notes linked!",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while linking the notes!",
      error: error,
    });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const note = searchParams.get("note");

  const session = driver.session();

  try {
    const resNotes = await session.executeRead((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[HAS_NOTE]->(n:Note {id: $noteId})
          MATCH (n)-[r:LINKED_TO]->(n_link:Note)
          WITH COLLECT(DISTINCT {title: n_link.title, content: n_link.content, id: n_link.id , updated_at: apoc.date.toISO8601(datetime(n_link.updated_at).epochMillis, "ms"), linkDescription: r.description } ) as linkedNotes 
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
