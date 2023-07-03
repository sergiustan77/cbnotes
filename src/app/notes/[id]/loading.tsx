import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="w-full h-[100vh] container ">
      <Skeleton className="h-28 w-full mt-8 rounded-md" />
      <Skeleton className="h-full w-full mt-8 rounded-md" />
    </div>
  );
};

export default loading;
