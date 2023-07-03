import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="container w-full h-[100vh] grid place-items-center">
      <Skeleton className="w-full h-20 mt-4  rounded-md" />
      <div className="w-full h-full flex flex-wrap mt-4 place-content-start gap-4 ">
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
        <Skeleton className="w-80 h-80 mt-4  rounded-md" />
      </div>
    </div>
  );
};

export default loading;
