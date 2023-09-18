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
import { UserButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
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
import randomUUID from "@/lib/randomUUID";
import { useRouter } from "next/navigation";

type Props = {};

const MobileMenu = (props: Props) => {
  const { userId } = useAuth();
  const router = useRouter();
  const newNote = async () => {
    const id = randomUUID();
    const res = await fetch("/api/notes/new", {
      method: "POST",
      body: JSON.stringify({
        userId: userId as string,
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
                <Button
                  onClick={newNote}
                  variant="default"
                  size="default"
                  className="w-full"
                >
                  <PlusIcon />
                </Button>
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
