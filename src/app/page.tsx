import React from "react";

import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignedIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="container mx-auto flex flex-col p-[2px] justify-center border   rounded-md mt-4 items-center h-[90vh] ">
      <div className="container bg-background flex flex-col md:flex-row justify-center items-center  gap-4 rounded-sm     h-full">
        <div className=" relative container  h-full  rounded-md bg-background  flex items-center  ">
          <Image
            className="bg-background rounded-sm  p-4 "
            src="/notes.svg"
            fill
            style={{
              objectFit: "contain",
            }}
            alt="Notes Illustration"
          />
        </div>
        <div className=" flex flex-col gap-4 justify-start items-start">
          {" "}
          <h1 className="p-2 z-10 animate-text bg-gradient-to-r from-cyan-600 to-fuchsia-600 bg-clip-text text-transparent  scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl ">
            All your ideas in one place
          </h1>
          <SignedOut>
            {" "}
            <Link
              href={"/auth/sign-in"}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href={"/notes"}
              className={buttonVariants({ variant: "outline", size: "xl" })}
            >
              Go to your notes
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Page;
