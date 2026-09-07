"use client";

import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowUpDown,
  CalendarArrowDown,
  CalendarArrowUp,
  ClockArrowDown,
  ClockArrowUp,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_NOTE_SORT, isNoteSort, type NoteSort } from "@/lib/note-sort";

type Props = {
  initialSort: NoteSort;
};

const SortFilter = ({ initialSort }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    if (!isNoteSort(value)) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (value === DEFAULT_NOTE_SORT) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Sort notes">
          <ArrowUpDown className="text-primary" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Sort notes</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={initialSort}
          onValueChange={handleSortChange}
        >
          <DropdownMenuRadioItem value="updated-desc">
            <ClockArrowDown className="mr-2 h-4 w-4" />
            Recently updated
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="updated-asc">
            <ClockArrowUp className="mr-2 h-4 w-4" />
            Least recently updated
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="title-asc">
            <ArrowDownAZ className="mr-2 h-4 w-4" />
            Title A–Z
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="title-desc">
            <ArrowUpAZ className="mr-2 h-4 w-4" />
            Title Z–A
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="created-desc">
            <CalendarArrowDown className="mr-2 h-4 w-4" />
            Newest created
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="created-asc">
            <CalendarArrowUp className="mr-2 h-4 w-4" />
            Oldest created
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortFilter;
