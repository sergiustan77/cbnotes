import React from "react";
import NewNote from "@/components/NewNote";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container h-[90vh] mt-4">
      <NewNote />
    </div>
  );
};

export default page;
