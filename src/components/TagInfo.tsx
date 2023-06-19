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
import { Info, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  tag: string;
};

const NoteDropdown = ({ userId, tag }: Props) => {
  const router = useRouter();

  const deleteTag = async () => {
    const res = await fetch(
      `http://localhost:3000/api/notes/tags/delete?userId=${userId}&tag=${tag}`,
      { method: "DELETE" }
    ).then((r) => {
      if (r.status === 200) {
        router.push("/notes/tags");
        router.refresh();
      }
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
        <DropdownMenuLabel>Tag Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={deleteTag}>
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            <span className=" text-red-600">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteDropdown;
