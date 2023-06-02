import React from "react";
import { driver } from "@/lib/neo4j";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
type Props = {};

const getCreatedUser = async (userId: any) => {
  const session = driver.session();

  const res = await session.executeWrite((tx) =>
    tx.run(
      `MERGE (u:User {userId: $userId})
        RETURN u`,
      { userId }
    )
  );

  const values = res.records.map((record) => record.toObject());

  return values;
};

const page = async (props: Props) => {
  const { userId } = auth();
  const createUser = await getCreatedUser(userId);
  if (createUser.length > 0) {
    redirect("/notes");
  }
  return <div className="text-primary">Getting thing ready...</div>;
};

export default page;
