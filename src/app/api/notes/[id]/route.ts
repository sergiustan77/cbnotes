import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const note = await prisma.note.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: note.id,
      title: note.title,
      content: note.content,
      noteContentText: note.contentText,
      created_at: note.createdAt.toISOString(),
      updated_at: note.updatedAt.toISOString(),
      tags: [],
      linkedNotes: [],
    });
  } catch (error) {
    console.error("Failed to retrieve note:", error);

    return NextResponse.json(
      { message: "Failed to retrieve note" },
      { status: 500 },
    );
  }
}
