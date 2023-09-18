"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Info, Edit2, Trash2, LinkIcon, Share2, Settings } from "lucide-react";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Trash } from "lucide-react";
import LinkNotesSearch from "./LinkNotesSearch";

import Note from "@/lib/interfaces/Note";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
  note: Note;

  update: boolean;
  setUpdate: Function;
};

const NoteActions = ({ note, update, setUpdate }: Props) => {
  const [linkToDescription, setLinkToDescription] = React.useState("");
  const [linkTo, setLinkTo] = React.useState<Note>();
  const { userId } = useAuth();
  const router = useRouter();
  const linkNotes = async () => {
    const res = fetch("/api/notes/link", {
      method: "POST",
      body: JSON.stringify({
        note: note.id,
        linkTo: linkTo,
        linkDescription: linkToDescription,
        userId: userId,
      }),
    }).then(() => {
      setUpdate(!update);
      setLinkTo(undefined);
      setLinkToDescription("");
    });
  };

  const deleteNoteHandle = async () => {
    const res = fetch("/api/notes/delete", {
      method: "POST",
      body: JSON.stringify({
        id: note.id,
        userId: userId,
      }),
    }).then(() => {
      router.push("/notes");
      router.refresh();
    });
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Info />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" ">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                className="flex items-center"
                href={`/notes/${note.id}/settings`}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DialogTrigger className="w-full">
              <DropdownMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" />
                <span>Link Notes</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={deleteNoteHandle}>
              <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              <span className=" text-red-600">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="w-full grid place-items-center ">
        <DialogHeader className="w-full ">
          <DialogTitle>Link this note to other notes</DialogTitle>
          <DialogDescription>
            Creating links between notes can improve your organization and
            thinking process!
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col gap-4 py-4 w-full  ">
          <div className="">
            {" "}
            <Label
              htmlFor="linkTo"
              className="text-right w-full  flex items-end place-content-between"
            >
              <div className="flex items-end text-lg ">Link to</div>

              {linkTo && (
                <div className="flex items-end">
                  {" "}
                  <Button
                    onClick={() => {
                      setLinkTo(undefined);
                      setLinkToDescription("");
                    }}
                    className="h-6 w-6"
                    variant={"ghost"}
                    size={"iconCircleSmall"}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </Label>
            <div id="linkTo" className="w-full">
              <LinkNotesSearch
                update={update}
                userId={userId as string}
                selectedNote={linkTo}
                setSelectedNote={setLinkTo}
                note={note}
              />
            </div>
          </div>
          {linkTo && (
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-lg" htmlFor="linkToDesc">
                Description
              </Label>
              <Textarea
                className=" resize-none"
                id="linkToDesc"
                value={linkToDescription}
                onChange={(e) => {
                  setLinkToDescription(e.target.value);
                }}
              />
            </div>
          )}
        </div>
        {linkTo && (
          <DialogFooter className="w-full ">
            <DialogTrigger className="w-full">
              {" "}
              <Button className="w-full" onClick={linkNotes} type="submit">
                Link
              </Button>
            </DialogTrigger>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NoteActions;
