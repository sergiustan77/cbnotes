import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserAvatar from "./UserAvatar";
import { clerkClient } from "@clerk/nextjs";
import { Badge } from "../ui/badge";

type Props = {
  userId: string;
};

const UserHoverCard = async ({ userId }: Props) => {
  const user = await clerkClient.users.getUser(userId);
  return (
    <HoverCard>
      <HoverCardTrigger className="" asChild>
        <Button variant={"link"} className="p-0">
          <UserAvatar userId={userId} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit ">
        <div className="flex justify-between space-x-2">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="text-sm font-semibold">
              {user.firstName} {user.lastName}
            </div>
            <p className="text-muted-foreground">{user.username}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
