import { driver } from "@/lib/neo4j";
import { auth } from "@clerk/nextjs/server";
export async function GET(request: Request) {
  const session = driver.session();
  const { userId } = auth();
  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS]-(n:Note)
      RETURN { title: n.title, content: n.content } as note`,
      { userId }
    )
  );

  session.close();
  const values = res.records.map((r) => r.get("note"));

  return JSON.parse(values.toString());
}

export async function POST(request: Request) {
  const session = driver.session();
  const { userId, title, content } = await request.json();
  const res = await session.executeWrite((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})
      CREATE (n:Note {title: $title, content: $content})
            CREATE (u)-[:HAS]->(n)
    
    `,
      { userId, title, content }
    )
  );

  session.close();

  return new Response(JSON.stringify("Hey!"));
}
