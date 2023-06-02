import { Badge } from "@/components/ui/badge";
import { getTags } from "@/lib/note-actions/getTags";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

type Props = {};

const page = async (props: Props) => {
  const t: string = "";

  const { userId } = auth();
  const tags = await getTags(userId);
  return (
    <div className="container mx-auto h-[90vh]  flex flex-col gap-4 my-6 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        Your tags
      </h1>
      <div className="flex flex-wrap rounded-md gap-2 md:gap-4 my-4  h-full">
        {tags.map(
          (t: any) =>
            t.tag && (
              <Link className="w-fit h-fit" href={`/notes/tags/${t.tag}`}>
                <Badge className=" cursor-pointer px-6 py-4  ">
                  <h1>{t.tag}</h1>
                </Badge>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default page;
