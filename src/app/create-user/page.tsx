import React from "react";

import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
type Props = {};

const CreateUserPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/auth/sign-in");
  }

  await prisma.user.upsert({
    where: {
      id: userId,
    },
    update: {},
    create: {
      id: userId,
    },
  });

  redirect("/notes");
};

export default CreateUserPage;
