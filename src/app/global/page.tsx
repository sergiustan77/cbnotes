import TrendingTopics from "@/components/carrousels/TrendingTopics";
import GlobalNoteCard from "@/components/global-page/GlobalNoteCard";
import GlobeAnimation from "@/components/global-page/GlobeAnimation";
import { Skeleton } from "@/components/ui/skeleton";
import Note from "@/lib/interfaces/Note";
import { driver } from "@/lib/neo4j";
import { Globe } from "lucide-react";
import React, { Suspense } from "react";

type Props = {};

const getGlobalNotes = async () => {
  const session = driver.session();
  const resNotes = await session.executeRead((tx) =>
    tx.run(
      `MATCH (u:User)-[r:HAS_NOTE]->(n:Note {isGlobal: true})
     OPTIONAL MATCH (n)-[:TAGGED_IN]->(t:Tag)
     WITH COLLECT(DISTINCT t.name) AS tags, n, u
     WITH {title: n.title, content: n.content, id: n.id, updated_at: apoc.date.toISO8601(datetime(n.updated_at).epochMillis, "ms"), likes: n.likes, tags: tags, user: u.userId} as note
     WITH COLLECT(note) as notes
     RETURN notes
`
    )
  );

  const notes = resNotes.records.map((r) => r.get("notes"))[0];
  await session.close();
  return notes;
};

const page = async (props: Props) => {
  const notes = await getGlobalNotes();
  return (
    <div className=" w-full grid gap-4 ">
      <div className="hero ">
        <div className="flex items-center gap-8">
          <GlobeAnimation />
          <div className="">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Explore new ideas
            </h1>
            <h3 className="mt-2 text-muted-foreground scroll-m-20 text-2xl font-semibold tracking-tight">
              Search the global collection of notes provied by the community
            </h3>
          </div>
        </div>
      </div>

      <div className="search">searchbar</div>

      <div className="notes w-full h-full flex flex-wrap mt-4 place-content-start gap-4">
        {notes.map((n: Note, index: number) => (
          <GlobalNoteCard key={index} note={n} />
        ))}
      </div>
    </div>
  );
};

export default page;
