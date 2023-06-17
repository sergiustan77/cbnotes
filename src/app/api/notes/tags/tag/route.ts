import { NextRequest, NextResponse } from "next/server";
import { driver } from "@/lib/neo4j";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const tag = searchParams.get("tag");
  const session = driver.session();

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[r:HAS_TAG]-(t:Tag {name: $tag})<-[:TAGGED_IN]-(n:Note)
      WITH COLLECT(t.name) as tags, n
        RETURN DISTINCT { title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags } as note`,
        { userId, tag }
      )
    );

    await session.close();
    const notes = res.records.map((r) => r.get("note"));

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error while getting the tags!",
    });
  }
}
