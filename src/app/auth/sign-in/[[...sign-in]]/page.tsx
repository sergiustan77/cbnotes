import React from "react";

import { SignIn } from "@clerk/nextjs";
const Page = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-[90vh]">
      <SignIn
        redirectUrl={"/notes"}
        signUpUrl="/auth/sign-up"
        appearance={{
          elements: {
            identityPreview: "border-border bg-background",
            identityPreviewText: "text-primary",
            identityPreviewEditButtonIcon: "text-primary/90",
            formFieldAction:
              "text-primary font-semibold hover:text-primary/90 ",
            card: "rounded-xl border-border bg-card text-card-foreground shadow-sm p-8 ",
            header: "flex flex-col space-y-1.5 ",
            headerTitle:
              "text-card-foreground text-lg font-semibold leading-none tracking-tight",
            headerSubtitle: "text-sm text-muted-foreground",
            alternativeMethodsBlockButton:
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground text-primary h-10 py-2 px-4",
            footer: "flex items-center ",
            formFieldLabel: "text-card-foreground",
            formFieldErrorText: "text-red-500",
            formFieldInputShowPasswordIcon:
              "text-primary hover:text-primary/90 ",

            formHeaderTitle:
              "text-card-foreground text-lg font-semibold leading-none tracking-tight",
            formHeaderSubtitle: "text-sm text-muted-foreground",
            otpCodeFieldInput:
              "text-card-foreground flex h-10 w-full   bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-b border-muted-foreground focus:border-muted-foreground",
            formResendCodeLink:
              "text-muted-foreground font-semibold hover:text-primary/90",
            formFieldInput:
              "text-card-foreground flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            dividerRow: "hidden",
            formButtonPrimary:
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4",
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
