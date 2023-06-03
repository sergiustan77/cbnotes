import { signIn } from "next-auth/react";
import React from "react";
import { driver } from "@/lib/neo4j";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignUp } from "@clerk/nextjs";
const Page = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-[90vh]">
      <SignUp
        redirectUrl={"/notes"}
        signInUrl={"/auth/sign-in"}
        appearance={{
          elements: {
            card: "rounded-xl border-border bg-card text-card-foreground shadow-sm p-8 ",
            header: "flex flex-col space-y-1.5 ",
            headerTitle:
              "text-card-foreground text-lg font-semibold leading-none tracking-tight",
            headerSubtitle: "text-sm text-muted-foreground",

            footer: "flex items-center ",
            formFieldLabel: "text-card-foreground",
            formFieldInput:
              "text-card-foreground flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            dividerRow: "hidden",
            formButtonPrimary:
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4",
            formFieldInputShowPasswordButton:
              "text-primary hover:bg-accent hover:text-accent-foreground",
            socialButtonsBlockButton__google:
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground text-primary h-10 py-2 px-4",
            footerActionText: "text-muted-foreground",
            footerActionLink:
              "text-primary font-semibold hover:text-primary/90",
          },
          layout: {
            socialButtonsPlacement: "bottom",
          },
        }}
      />
    </div>
  );
};

export default Page;
