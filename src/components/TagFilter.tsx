"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal, Menu, Tag } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  filter: string;
  setFilter: (value: string) => void;
}

const TagFilter = ({ filter, setFilter }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <SlidersHorizontal className="text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Filter Notes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
          <DropdownMenuRadioItem className="flex gap-2" value="all">
            <Menu className="h-4 w-4" />
            All notes
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="by_tags">
            <Tag className="h-4 w-4" />
            By Tags
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagFilter;
