import React from "react";

import Notes from "@/components/Notes";
import { driver } from "@/lib/neo4j";
import { auth } from "@clerk/nextjs";

type Props = {};

const getNotes = async (userId: any) => {
  const session = driver.session();

  const res = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS]-(n:Note)
      RETURN { title: n.title, content: n.content, id: n.id } as note`,
      { userId }
    )
  );

  session.close();
  const values = res.records.map((r) => r.get("note"));

  return values;
};

const page = async ({}: Props) => {
  const { userId } = auth();
  const notes = await getNotes(userId);

  return (
    <div className="container mt-4 rounded-md border h-[90vh]">
      <Notes notes={notes} />
    </div>
  );
};

export default page;
