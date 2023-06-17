import React from "react";
import { UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="container mx-auto flex place-content-center py-4">
      <UserProfile
        appearance={{
          elements: {
            card: "shadow-none border-border",
          },
        }}
        path="/account"
        routing="path"
      />
    </div>
  );
};

export default page;
