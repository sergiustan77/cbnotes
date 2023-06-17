import React from "react";
import Editor from "@/components/editor/Editor";
import { auth } from "@clerk/nextjs";

type Props = {};

const getNotes = async () => {
  const { userId } = auth();
  const notes = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  const noTes = await notes.json();
  console.log(noTes);
};
const page = async (props: Props) => {
  const notes = await getNotes();
  return <div className="container"></div>;
};
export default page;
