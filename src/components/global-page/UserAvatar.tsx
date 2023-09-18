import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { clerkClient } from "@clerk/nextjs";

type Props = {
  userId: string;
};

const UserAvatar = async ({ userId }: Props) => {
  const user = await clerkClient.users.getUser(userId);

  return (
    <div className="w-fit flex justify-center gap-2 font-semibold items-center rounded-full ">
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>{user.imageUrl}</AvatarFallback>
      </Avatar>{" "}
      <h5 className="flex gap-1 text-sm">
        <span>{user.username}</span>
      </h5>
    </div>
  );
};

export default UserAvatar;
