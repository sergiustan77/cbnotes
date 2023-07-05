"use client";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ui/ThemeToggle";
import { buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { PlusIcon, StickyNote, Tag, TagsIcon } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { Montserrat } from "next/font/google";
import Image from "next/image";
type Props = {};

const montserrat = Montserrat({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});
const Nav = (props: Props) => {
  const { user } = useUser();
  return (
    <div className=" fixed bg-background z-50 top-0  w-full border-b p-2">
      <div className="w-full md:container flex place-content-between  ">
        <Link href={"/"} className="logo flex items-center gap-2 text-primary">
          <Image
            className="hidden dark:block"
            src={"/logoLight.svg"}
            width={32}
            height={32}
            alt="Memograph"
          />
          <Image
            className="block dark:hidden"
            src={"/logoDark.svg"}
            width={32}
            height={32}
            alt="Memograph"
          />
          <p className=" text-lg font-bold">memograph</p>
        </Link>

        <SignedOut>
          <div className="flex items-center font-semibold">Hi!</div>
        </SignedOut>

        <div className=" flex gap-2 ">
          <div className="">
            {" "}
            <ThemeToggle />
          </div>

          <SignedIn>
            {" "}
            <div className="md:hidden flex gap-4 ">
              <SignedIn>
                {" "}
                <UserButton />
              </SignedIn>
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
                </Link>{" "}
                <UserButton />
              </div>
            </div>{" "}
          </SignedIn>
          <SignedOut>
            <div className="w-full flex gap-4">
              {" "}
              <Link
                href={"/auth/sign-in"}
                className={buttonVariants({ variant: "link", size: "sm" })}
              >
                Sign In
              </Link>
              <Link
                href={"/auth/sign-up"}
                className={buttonVariants({ variant: "default", size: "sm" })}
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
