"use client";
import React from "react";

import { Button, buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import getInitialLetters from "@/lib/getInitials";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Channel from "@/lib/interfaces/Channel";
import { usePathname } from "next/navigation";

type Props = {
  channel: Channel;
};

const ChannelListItem = ({ channel }: Props) => {
  const pathname = usePathname();
  const shortChannelName = getInitialLetters(channel.name);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/channels/${channel.id}`}
            className={cn(
              buttonVariants({ size: "channel", variant: "secondary" }),
              "justify-center font-normal hover:bg-muted-foreground hover:text-white",
              pathname === `/channels/${channel.id}` &&
                "bg-muted-foreground text-white"
            )}
          >
            {shortChannelName}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{channel.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChannelListItem;
