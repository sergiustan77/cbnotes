import { driver } from "@/lib/neo4j";
import { auth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const createUserNode = async (userId: string) => {
  const session = driver.session();

  const res = await session.executeWrite((tx) => {
    tx.run("MERGE (u:User {userId: $userId})", userId);
  });
  await session.close().then(() => {
    redirect("/notes");
  });
};
const page = async (props: Props) => {
  const { userId } = auth();
  const creatUser = await createUserNode(userId as string);
  return (
    <div className="w-full h-[100vh] text-4xl flex gap-4">
      Creating User <Loader2 className=" animate-spin" />
    </div>
  );
};

export default page;
