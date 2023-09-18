"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Globe, Plus, StickyNote, Tags } from "lucide-react";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import randomUUID from "@/lib/randomUUID";
import { useRouter } from "next/navigation";

export function NavMenuDesktop() {
  const router = useRouter();
  const { user } = useUser();
  const newNote = async () => {
    const id = randomUUID();
    const res = await fetch("/api/notes/new", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id as string,
        title: "",
        content: "",
        noteContentText: "",
        id: id,
      }),
    });
    router.push(`/notes/${id}`);
  };
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink className="w-full" asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Globe className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>

              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <Link href="/global" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Global
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/channels" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Channels
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Gallery</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[400px]">
            <ul className="grid gap-3 p-4 w-[400px] ">
              <li>
                <Link
                  className="flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href={"/notes"}
                >
                  <StickyNote className="w-6 h-6" />
                  <div className="  ">
                    <h1 className="text-sm font-medium leading-none">Notes</h1>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View all your notes.
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href={"/notes/tags"}
                >
                  <Tags className="w-6 h-6" />
                  <div className="">
                    {" "}
                    <h1 className="text-sm font-medium leading-none">Tags</h1>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      View all your tags.
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Button
                  onClick={newNote}
                  variant="default"
                  size="default"
                  className="w-full gap-2 "
                >
                  <Plus className="w-6 h-6" />
                  <div className="">
                    {" "}
                    <h1 className="text-sm font-medium leading-none">
                      New Note
                    </h1>
                  </div>
                </Button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
