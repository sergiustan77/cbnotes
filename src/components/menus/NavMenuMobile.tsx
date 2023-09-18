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
import {
  Globe,
  MenuIcon,
  Plus,
  PlusIcon,
  StickyNote,
  Tags,
  Tv,
} from "lucide-react";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import randomUUID from "@/lib/randomUUID";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function NavMenuMobile() {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-4 grid w-full gap-4 place-items-center ">
          <div className="w-full">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              Community
            </h2>{" "}
            <div
              className="mt-4 grid gap-4
          "
            >
              {" "}
              <SheetClose asChild>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "default",
                    }),
                    "flex w-full gap-2 items-center"
                  )}
                  href={"/global"}
                >
                  <Globe className="w-6 h-6" /> Global
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "default",
                    }),
                    "flex w-full gap-2 items-center"
                  )}
                  href={"/channels"}
                >
                  <Tv className="w-6 h-6" /> Channels
                </Link>
              </SheetClose>
            </div>
          </div>

          <div className="w-full">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              My Gallery
            </h2>
            <div className="grid mt-4 w-full gap-4">
              <SheetClose asChild>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "default",
                    }),
                    "flex w-full gap-2 items-center"
                  )}
                  href={"/notes"}
                >
                  <StickyNote className="w-6 h-6" /> Notes
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "default",
                    }),
                    "flex w-full gap-2 items-center"
                  )}
                  href={"/notes/tags"}
                >
                  <Tags className="w-6 h-6" /> Tags
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  onClick={newNote}
                  variant="default"
                  size="default"
                  className="w-full gap-2"
                >
                  <PlusIcon /> New note
                </Button>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
