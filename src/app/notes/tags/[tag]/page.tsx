import React from "react";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, Tag, TagsIcon } from "lucide-react";
import Notes from "@/components/Notes";

import { auth } from "@clerk/nextjs";

import TagInfo from "@/components/TagInfo";
import { driver } from "@/lib/neo4j";
import Note from "@/lib/interfaces/Note";

type Props = {
  params: {
    tag: string;
  };
};
const getNotesByTag = async (userId: string, tag: string) => {
  const session = driver.session();

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `MATCH (u:User {userId: $userId})-[r:HAS_TAG]->(t:Tag {name: $tag})<-[:TAGGED_IN]-(n:Note)
        MATCH (n)-[:TAGGED_IN]->(note_tag:Tag)<-[:HAS_TAG]-(u)
        WITH COLLECT(note_tag.name) as tags, n, t
          RETURN DISTINCT { title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), tags: tags } as note`,
        { userId, tag }
      )
    );

    await session.close();
    const notes = res.records.map((r) => r.get("note"));
    return notes;
  } catch (error) {
    return JSON.stringify({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }

  // const res = await fetch(`/api/notes/tags/tag?userId=${userId}&tag=${tag}`);

  // return await res.json();
};
const page = async ({ params: { tag } }: Props) => {
  const { userId } = auth();
  const notes: any = await getNotesByTag(userId as string, decodeURI(tag));

  return (
    <div className="container mx-auto my-6 h-full">
      <h1 className="text-4xl w-full flex place-content-between md:flex-row  items-center h-full  mb-2  ">
        <Badge className="scroll-m-20 text-4xl font-extrabold tracking-tight grid place-items-center  gap-2  px-4 py-2">
          {" "}
          <h1 className=""> {decodeURI(tag)}</h1>
        </Badge>

        <div className="text-xl flex gap-4  items-end">
          <TagInfo userId={userId as string} tag={decodeURI(tag)} />
        </div>
      </h1>

      <Suspense fallback={<Loader2 className=" animate-spin" />}>
        <Notes notes={notes} />
      </Suspense>
    </div>
  );
};

export default page;
