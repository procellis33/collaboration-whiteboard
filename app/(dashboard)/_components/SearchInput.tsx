"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useDeferredValue, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const parsed = qs.parse(location.search);
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          ...parsed,
          search: deferredSearchQuery,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [deferredSearchQuery, router]);

  return (
    <div className={"w-full relative max-w-[516px]"}>
      <Search
        className={
          "absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
        }
      />
      <Input
        className={
          "w-full pl-9 pr-9 focus-visible:ring-indigo-300 focus-visible:ring-offset-0 focus-visible:ring dark:bg-zinc-900 h-[46px]"
        }
        placeholder={"Search boards"}
        onChange={handleChange}
        value={searchQuery}
      />
      {searchQuery.length !== 0 && (
        <button
          className={
            "flex items-center justify-center opacity-60 hover:opacity-100 transition absolute top-1/2 transform -translate-y-1/2 right-3 text-muted-foreground h-4 w-4"
          }
          onClick={clearSearchQuery}
        >
          <X />
        </button>
      )}
    </div>
  );
};
