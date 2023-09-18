"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { StickyNote, TrendingUp } from "lucide-react";
import { Separator } from "../ui/separator";

interface GlobalSidebarMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

const GlobalSidebarMenu = ({
  className,
  items,
  ...props
}: GlobalSidebarMenuProps) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "grid space-x-2  gap-6 lg:space-x-0 lg:space-y-1 ",
        className
      )}
      {...props}
    >
      <Link href={"/global"}>
        <Badge
          className={cn(
            pathname === "/global"
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:underline"
              : "hover:bg-primary/10 hover:underline bg-background text-primary border border-border",
            "py-2 px-4 text-lg flex gap-2 place-content-center"
          )}
        >
          <StickyNote />
          All notes
        </Badge>
      </Link>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <h4 className="px-2 py-1 flex gap-4 items-center">
            <TrendingUp className="w-8 h-8" />
            <span className="text-xl">Trending</span>
          </h4>
          <Separator />
        </div>

        <div className="flex flex-wrap gap-2">
          {" "}
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <Badge
                className={cn(
                  pathname === item.href
                    ? "bg-primary text-primary-foreground hover:bg-priamry/90 hover:underline"
                    : "hover:bg-primary/10 hover:underline bg-background text-primary border border-border",
                  "py-2 px-4 text-sm"
                )}
              >
                {" "}
                {item.title}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default GlobalSidebarMenu;
