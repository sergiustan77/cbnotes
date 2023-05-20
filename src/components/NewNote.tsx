"use client";
import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { driver } from "@/lib/neo4j";

type Props = {};

const NewNote = ({}: Props) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { userId } = useAuth();

  const router = useRouter();

  const addNote = async () => {
    const session = driver.session();

    const res = await session
      .executeWrite((tx) =>
        tx.run(
          `MATCH (u:User {userId: $userId})
        CREATE (n:Note {title: $title, content: $content, id: $id, created_at: datetime({timezone: 'Europe/Bucharest'})})
              CREATE (u)-[:HAS]->(n)
    
      `,
          { userId, title, content, id: crypto.randomUUID() }
        )
      )
      .then(() => {
        router.push("/notes");
        router.refresh();
      });

    session.close();
  };

  return (
    <div className="flex place-content-center ">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Add a new note</CardTitle>
          <CardDescription>Write down your thoughts...</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          />
          <Textarea
            className="h-auto"
            rows={20}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Set your heart ablaze!"
          />
        </CardContent>
        <CardFooter className="flex place-content-end">
          <Button onClick={addNote} size={"lg"}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewNote;
