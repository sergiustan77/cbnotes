"use client";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ui/ThemeToggle";
import { buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { PlusIcon, StickyNote, Tag, TagsIcon } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
type Props = {};

const Nav = (props: Props) => {
  const { user } = useUser();
  return (
    <div className="  border-b p-2">
      <div className="container mx-auto flex place-content-between  ">
        <SignedIn>
          <div className="flex gap-4 items-center">
            <UserButton />
            <p className=" font-semibold"> {user?.fullName}</p>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center font-semibold">Hi!</div>
        </SignedOut>

        <div className=" flex gap-2 ">
          <ThemeToggle />

          <SignedIn>
            <div className="md:hidden ">
              <MobileMenu />
            </div>
            <div className=" gap-2 hidden md:flex">
              <div className="gap-4 flex">
                <Link
                  href={"/notes/new-note"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                >
                  <PlusIcon />
                </Link>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "icon",
                    })
                  )}
                  href={`/notes/tags`}
                >
                  <TagsIcon />
                </Link>
                <Link
                  href={"/notes"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                >
                  <StickyNote />
                </Link>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="w-full flex gap-4">
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
      </div>
    </div>
  );
};

export default Nav;
