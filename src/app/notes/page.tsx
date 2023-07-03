import React from "react";

import { auth } from "@clerk/nextjs";

import SearchNotes from "@/components/SearchNotes";

type Props = {};

const getNotes = async (userId: string) => {
  const notesData = await fetch(
    `http://localhost:3000/api/notes?userId=${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await notesData.json();
};

const page = async ({}: Props) => {
  const { userId } = auth();

  const notes: any = await getNotes(userId as string);

  return (
    <div className="container mx-auto mt-4 rounded-md h-auto">
      <div className="my-2 flex-row md:flex w-full h-auto gap-8 ">
        <SearchNotes notes={notes.notes} tags={notes.tags} />
      </div>
    </div>
  );
};

export default page;
