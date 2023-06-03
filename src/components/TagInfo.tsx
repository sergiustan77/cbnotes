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

import deleteTag from "@/lib/note-actions/deleteTag";

type Props = {
  userId: string;
  tag: string;
};

const NoteDropdown = ({ userId, tag }: Props) => {
  const router = useRouter();

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
          <DropdownMenuItem
            onClick={() => {
              deleteTag(userId, tag).then(() => {
                router.push("/notes/tags");
                router.refresh();
              });
            }}
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            <span className=" text-red-600">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteDropdown;
