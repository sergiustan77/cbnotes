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
import {
  ArrowUpDown,
  SortAsc,
  SortDesc,
  Calendar,
  Clock,
  ChevronsUpDown,
  CaseSensitive,
  Sunset,
  Sunrise,
} from "lucide-react";

type Props = {
  sortBy: string;
  setSortBy: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
};

const SortFilter = ({
  sortBy,
  setSortBy,
  date,
  setDate,
  title,
  setTitle,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <ArrowUpDown className="text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Sort Notes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem className="flex gap-2" value="default">
            <ChevronsUpDown className="h-4 w-4" />
            Default
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem className="flex gap-2" value="title">
            <CaseSensitive className="h-4 w-4" />
            Title
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem className="flex gap-2" value="updated_at">
            <Calendar className="h-4 w-4" />
            Date
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        {sortBy === "updated_at" && (
          <DropdownMenuRadioGroup value={date} onValueChange={setDate}>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem className="flex gap-2" value="DESC">
              <Sunset className="h-4 w-4" />
              Newest
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex gap-2" value="ASC">
              <Clock className="h-4 w-4" />
              Oldest
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}

        {sortBy === "title" && (
          <DropdownMenuRadioGroup value={title} onValueChange={setTitle}>
            {" "}
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem className="flex gap-2" value="ASC">
              <SortAsc className="h-4 w-4" />
              Asc
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex gap-2" value="DESC">
              <SortDesc className="h-4 w-4" />
              Desc
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortFilter;
