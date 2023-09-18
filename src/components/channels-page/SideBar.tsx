import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tv } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import ChannelListItem from "./ChannelListItem";
import { Separator } from "../ui/separator";
import Channel from "@/lib/interfaces/Channel";
import { usePathname } from "next/navigation";

type Props = {};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const mockChannels: Channel[] = [
  {
    id: "1",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "2",
    name: "Crypto World",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "3",
    name: "Mental health",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "4",
    name: "New tech",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "5",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "6",
    name: "Mental Health",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "7",
    name: "Crypto World",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "8",
    name: "New Tech",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "9",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "10",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "11",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "12",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "13",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "14",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "15",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
  {
    id: "16",
    name: "Nature",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    owner: "test",
  },
];

const SideBar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("pb-12 w-fit h-full  ", className)}>
      <div className="py-2 h-full ">
        <ScrollArea className="h-[90vh] mt-2 px-1  ">
          <div className="space-y-1 p-2 grid place-content-center gap-1">
            <div className="">
              <Button variant={"default"} size={"channel"}>
                {" "}
                <Tv className="w-6 h-6" />
              </Button>
            </div>
            <Separator className="my-4" />
            {mockChannels?.map((channel, i) => (
              <ChannelListItem channel={channel} key={`${channel}-${i}`} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideBar;
