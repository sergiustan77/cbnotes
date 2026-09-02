import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!notes) {
      return NextResponse.json(
        { message: "No notes found for the user" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      notes.map((note) => {
        return {
          id: note.id,
          title: note.title,
          content: note.content,
          noteContentText: note.contentText,
          created_at: note.createdAt.toISOString(),
          updated_at: note.updatedAt.toISOString(),
          tags: [],
          linkedNotes: [],
        };
      }),
    );
  } catch (error) {
    console.error("Failed to retrieve note:", error);

    return NextResponse.json(
      { message: "Failed to retrieve notes" },
      { status: 500 },
    );
  }
}
