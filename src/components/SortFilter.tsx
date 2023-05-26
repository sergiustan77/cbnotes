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
            <h1 className="">Default</h1>
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem className="flex gap-2" value="title">
            <CaseSensitive className="h-4 w-4" />
            <h1 className="">Title</h1>
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem className="flex gap-2" value="updated_at">
            <Calendar className="h-4 w-4" />
            <h1>Date</h1>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        {sortBy === "updated_at" && (
          <DropdownMenuRadioGroup value={date} onValueChange={setDate}>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem className="flex gap-2" value="DESC">
              <Sunset className="h-4 w-4" />
              <h1>Newest</h1>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex gap-2" value="ASC">
              <Clock className="h-4 w-4" />
              <h1>Oldest</h1>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}

        {sortBy === "title" && (
          <DropdownMenuRadioGroup value={title} onValueChange={setTitle}>
            {" "}
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem className="flex gap-2" value="ASC">
              <SortAsc className="h-4 w-4" />
              <h1>Asc</h1>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="flex gap-2" value="DESC">
              <SortDesc className="h-4 w-4" />
              <h1>Desc</h1>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortFilter;
