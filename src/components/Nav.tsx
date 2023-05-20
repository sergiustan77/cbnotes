import ThemeToggle from "./ui/ThemeToggle";
import { Button, buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { PlusIcon, StickyNote } from "lucide-react";
import Link from "next/link";
type Props = {};

const Nav = async (props: Props) => {
  const user = await currentUser();
  return (
    <div className="flex place-content-evenly border-b p-2 ">
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
                variant: "iconCircle",
                size: "iconCircle",
              })}
            >
              <StickyNote
                size={"24"}
                className="rounded-[50%] text-primary-foreground"
              />
            </Link>
            <Link
              href={"/notes/new-note"}
              className={buttonVariants({
                variant: "iconCircle",
                size: "iconCircle",
              })}
            >
              <PlusIcon
                size={"24"}
                className="rounded-[50%] text-primary-foreground"
              />
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
  );
};

export default Nav;
