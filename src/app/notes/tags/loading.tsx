import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="container mx-auto w-full h-[100vh]">
      <Skeleton className="mt-4 w-full h-20" />
      <div className="flex flex-wrap gap-4 mt-4">
        {Array(32)
          .fill("Skeleton")
          .map((t, i) => (
            <Skeleton key={i} className="w-16 h-12 rounded-full" />
          ))}
      </div>
    </div>
  );
};

export default loading;
