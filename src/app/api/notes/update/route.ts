import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, content, noteContentText } = await request.json();
    if (
      typeof id !== "string" ||
      typeof content !== "string" ||
      typeof noteContentText !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid note data" },
        { status: 400 },
      );
    }

    const result = await prisma.note.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        content,
        contentText: noteContentText,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note updated" });
  } catch (error) {
    console.error("Failed to update note: ", error);

    return NextResponse.json(
      { message: "Failed to update the note" },
      { status: 500 },
    );
  }
}
