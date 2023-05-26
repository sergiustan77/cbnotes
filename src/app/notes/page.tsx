import React from "react";

import { auth } from "@clerk/nextjs";

import { getNotes } from "@/lib/note-actions/getAllNotes";

import { Suspense } from "react";

import SearchNotes from "@/components/SearchNotes";

type Props = {};

const page = async ({}: Props) => {
  const { userId } = auth();

  const notes: any = await getNotes(userId);

  return (
    <div className="container mt-4 rounded-md  h-[90vh]">
      <div className="my-2 flex-row md:flex h-[70vh] gap-8 ">
        <Suspense fallback={"Loading"}>
          <div className="w-full ">
            <SearchNotes notes={notes[0].notes} tags={notes[0].tags} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
