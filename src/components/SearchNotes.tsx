"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  initialQuery: string;
};

const SearchNotes = ({ initialQuery }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = React.useState(initialQuery);

  React.useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const updateSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedValue = value.trim();

    if (trimmedValue) {
      params.set("q", trimmedValue);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
    updateSearch(value);
  };

  return (
    <Label className="relative block w-full">
      <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2" />

      <Input
        id="search"
        className="pl-8"
        value={query}
        onChange={handleChange}
        placeholder="Search in notes"
      />
    </Label>
  );
};

export default SearchNotes;
