import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  try {
    const note = await prisma.note.create({
      data: {
        userId,
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Failed to create note:", error);

    return NextResponse.json(
      {
        message: "Failed to create a new note",
      },
      { status: 500 },
    );
  }
}
