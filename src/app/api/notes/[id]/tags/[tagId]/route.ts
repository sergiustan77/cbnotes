import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
    tagId: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: noteId, tagId } = await params;

    const result = await prisma.noteTag.deleteMany({
      where: {
        noteId,
        tagId,
        note: {
          userId,
        },
        tag: {
          userId,
        },
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: "Tag assignment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Tag removed from note",
    });
  } catch (error) {
    console.error("Failed to remove tag from note:", error);

    return NextResponse.json(
      { message: "Failed to remove tag from note" },
      { status: 500 },
    );
  }
}
