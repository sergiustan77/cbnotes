import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: RouteContext) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: noteId } = await params;
    const { name } = await request.json();

    if (typeof name !== "string") {
      return NextResponse.json(
        { message: "Tag name must be a string" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      return NextResponse.json(
        { message: "Tag name cannot be empty" },
        { status: 400 },
      );
    }

    if (trimmedName.length > 50) {
      return NextResponse.json(
        { message: "Tag name cannot exceed 50 characters" },
        { status: 400 },
      );
    }

    const normalizedName = trimmedName.toLowerCase();

    const tag = await prisma.$transaction(async (transaction) => {
      const note = await transaction.note.findFirst({
        where: {
          id: noteId,
          userId,
        },
        select: {
          id: true,
        },
      });

      if (!note) {
        return null;
      }

      const tag = await transaction.tag.upsert({
        where: {
          userId_normalizedName: {
            userId,
            normalizedName,
          },
        },
        update: {},
        create: {
          name: trimmedName,
          normalizedName,
          userId,
        },
      });

      await transaction.noteTag.upsert({
        where: {
          noteId_tagId: {
            noteId,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          noteId,
          tagId: tag.id,
        },
      });

      return {
        id: tag.id,
        name: tag.name,
      };
    });

    if (!tag) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ tag });
  } catch (error) {
    console.error("Failed to add tag:", error);

    return NextResponse.json({ message: "Failed to add tag" }, { status: 500 });
  }
}
