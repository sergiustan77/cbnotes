"use client";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ui/ThemeToggle";
import { Button, buttonVariants } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { PlusIcon, StickyNote, Tag, TagsIcon } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import randomUUID from "@/lib/randomUUID";
import { NavMenuDesktop } from "./menus/NavMenuDesktop";
import { NavMenuMobile } from "./menus/NavMenuMobile";
type Props = {};

const montserrat = Montserrat({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});
const Nav = (props: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const newNote = async () => {
    const id = randomUUID();
    const res = await fetch("/api/notes/new", {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id.toString(),
        title: "",
        content: "",
        noteContentText: "",
        id: id,
      }),
    });
    router.push(`/notes/${id}`);
  };

  return (
    <div className="  sticky z-[60] bg-background  top-0  w-full border-b p-2">
      <div className="md:container w-full  flex place-content-between  ">
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

        <div className=" flex gap-2 ">
          <div className="">
            {" "}
            <ThemeToggle />
          </div>

          <SignedIn>
            {" "}
            <div className="md:hidden flex gap-4 items-center">
              <SignedIn>
                {" "}
                <UserButton />
              </SignedIn>
              <NavMenuMobile />
            </div>
            <div className=" gap-2 hidden md:flex ">
              <div className="gap-2 flex items-center">
                <NavMenuDesktop />
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
