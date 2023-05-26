"use client";
import ThemeToggle from "./ui/ThemeToggle";
import { buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { PlusIcon, StickyNote, Tag } from "lucide-react";
import Link from "next/link";
type Props = {};

const Nav = (props: Props) => {
  const { user } = useUser();
  return (
    <div className="  border-b p-2">
      <div className="container flex place-content-between">
        {" "}
        <div className="flex place-items-center gap-4">
          {" "}
          <ThemeToggle /> Hi {user?.firstName}!
        </div>
        <div className="">
          <SignedIn>
            <div className="flex gap-4">
              <Link
                href={"/notes"}
                className={buttonVariants({
                  variant: "ghost",
                  size: "iconCircle",
                })}
              >
                <StickyNote />
              </Link>
              <Link
                href={"/notes/new-note"}
                className={buttonVariants({
                  variant: "ghost",
                  size: "iconCircle",
                })}
              >
                <PlusIcon />
              </Link>

              <UserButton />
            </div>
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
      </div>
    </div>
  );
};

export default Nav;
