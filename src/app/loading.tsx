import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="container w-full h-[100vh] grid place-items-center ">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default loading;
