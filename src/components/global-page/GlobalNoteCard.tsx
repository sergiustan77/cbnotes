import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Note from "@/lib/interfaces/Note";

import { Element, domToReact } from "html-react-parser";
import parse from "html-react-parser";
import { Badge } from "../ui/badge";
import Image from "next/image";
import {
  Calendar,
  Circle,
  CircleDot,
  Heart,
  Save,
  Youtube,
} from "lucide-react";
import { auth, clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserAvatar from "./UserAvatar";
import GlobalCardContent from "./GlobalCardContent";
import UserHoverCard from "./UserHoverCard";
import { Button } from "../ui/button";
import likeNote from "@/lib/global-note-actions/likeNote";
import checkLike from "@/lib/global-note-actions/checkLike";
import LikeButton from "./LikeButton";

type Props = {
  note: Note;
};

const GlobalNoteCard = async ({ note }: Props) => {
  return (
    <Card className="w-full h-fit overflow-hidden hover:border-muted-foreground">
      <Link
        className=" w-full h-full overflow-hidden rounded-lg "
        href={`/global/${note.id}`}
      >
        <CardHeader className=" ">
          <CardDescription className="flex gap-2 justify-between items-center text-xs">
            <UserHoverCard userId={note.user} />

            <span className="flex gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(note.updated_at).toLocaleString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </CardDescription>
          <CardTitle className="text-2xl font-bold pt-2">
            {note.title}
          </CardTitle>
          <div className=" w-full flex flex-wrap gap-1 ">
            {note.tags.map((t, i) => (
              <Badge key={i} className="">
                {t}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className=" w-full max-h-[30rem] bg-background  overflow-hidden break-all  ">
          <GlobalCardContent note={note} />
        </CardContent>
      </Link>
      <CardFooter className="h-fit mt-4 flex gap-2">
        <LikeButton note={note} />
        <Button variant={"secondary"} size={"icon"}>
          <Save />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GlobalNoteCard;
