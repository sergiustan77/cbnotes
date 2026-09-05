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

export async function PATCH(request: Request, { params }: RouteContext) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { title, content, noteContentText } = await request.json();

    const data: {
      title?: string;
      content?: string;
      contentText?: string;
    } = {};

    if (title !== undefined) {
      if (typeof title !== "string") {
        return NextResponse.json(
          { message: "Title must be a string" },
          { status: 400 },
        );
      }

      data.title = title.trim() || "Untitled";
    }

    if (content !== undefined) {
      if (typeof content !== "string") {
        return NextResponse.json(
          { message: "Content must be a string" },
          { status: 400 },
        );
      }
      data.content = content;
    }

    if (noteContentText !== undefined) {
      if (typeof noteContentText !== "string") {
        return NextResponse.json(
          { message: "Content text must be a string" },
          { status: 400 },
        );
      }

      data.contentText = noteContentText;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No valid fields were provided" },
        { status: 400 },
      );
    }

    const result = await prisma.note.updateMany({
      where: {
        id,
        userId,
      },
      data,
    });

    if (result.count === 0) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update note:", error);

    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const result = await prisma.note.deleteMany({
      where: {
        id,
        userId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete the note: ", error);
    return NextResponse.json(
      { message: "Failed to delete the note" },
      { status: 500 },
    );
  }
}
