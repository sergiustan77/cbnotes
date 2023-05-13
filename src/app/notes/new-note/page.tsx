import React from "react";
import NewNote from "@/components/NewNote";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container mt-8">
      <NewNote />
    </div>
  );
};

export default page;
