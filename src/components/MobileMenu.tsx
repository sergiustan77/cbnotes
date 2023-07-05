import {
  MenuIcon,
  PlusIcon,
  SidebarOpen,
  StickyNote,
  TagsIcon,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Label } from "./ui/label";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import React from "react";

import { cn } from "@/lib/utils";

type Props = {};

const MobileMenu = (props: Props) => {
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
        <div className=" py-4">
          <SignedIn>
            <div className=" gap-4 grid w-full place-items-center">
              <SheetClose asChild>
                <Link
                  type="submit"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "default",
                    }),
                    "flex w-full gap-2"
                  )}
                  href={`/notes/tags`}
                >
                  <TagsIcon className="w-6 h-6" /> My tags
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  type="submit"
                  href={"/notes"}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "default",
                    }),
                    "flex w-full gap-2"
                  )}
                >
                  <StickyNote className="w-6 h-6" /> All notes
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  type="submit"
                  href={"/notes/new-note"}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "default",
                    }),
                    "flex w-full gap-2 "
                  )}
                >
                  <PlusIcon className="w-6 h-6" /> New note
                </Link>
              </SheetClose>
            </div>{" "}
          </SignedIn>

          <SignedOut>
            <div className="flex gap-4">
              {" "}
              <Link
                href={"/auth/sign-in"}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Sign In
              </Link>
              <Link
                href={"/auth/sign-up"}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
