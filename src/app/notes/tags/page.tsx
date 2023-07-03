import { Badge } from "@/components/ui/badge";
import { driver } from "@/lib/neo4j";

import { auth } from "@clerk/nextjs";
import Link from "next/link";

import React from "react";

type Props = {};

const getTags = async (userId: string) => {
  // const res = await fetch(`/api/notes/tags?userId=${userId}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // return await res.json();

  const session = driver.session();

  const resTags = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User {userId: $userId})-[r:HAS_TAG]->(t:Tag)
        OPTIONAL MATCH (n:Note)-[:TAGGED_IN]->(t)
  
        WITH t, COLLECT(n) AS notes
        RETURN {tag: t.name, notes: notes} as tag
             `,
      { userId }
    )
  );

  const tags = resTags.records.map((r) => r.get("tag"));
  await session.close();
  return tags;
};
const page = async (props: Props) => {
  const { userId } = auth();
  const tags = await getTags(userId as string);
  return (
    <div className="container mx-auto h-[90vh]  flex flex-col gap-4 my-6 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        Your tags
      </h1>
      <div className="flex flex-wrap rounded-md gap-2 md:gap-4 my-4  ">
        {tags.map(
          (t: any) =>
            t.tag && (
              <Link
                key={t.tag}
                className="w-fit h-fit"
                href={`/notes/tags/${t.tag}`}
              >
                <Badge className=" px-6 py-4  ">
                  <div>{t.tag}</div>
                </Badge>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default page;
