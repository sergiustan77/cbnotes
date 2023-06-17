"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Info, Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  setEditing: Function;
  userId: string;
  id: string;
};

const NoteDropdown = ({ setEditing, userId, id }: Props) => {
  const router = useRouter();
  const deleteNoteHandle = async () => {
    const res = fetch("http://localhost:3000/api/notes/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        userId: userId,
      }),
    }).then(() => {
      router.push("/notes");
      router.refresh();
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Info />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" ">
        <DropdownMenuLabel>Note Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setEditing(true);
            }}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            <span>Edit note</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={deleteNoteHandle}>
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            <span className=" text-red-600">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteDropdown;
