import Link from "next/link";

import type Note from "@/lib/interfaces/Note";

import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  note: Note;
};

const MAX_VISIBLE_TAGS = 3;

const NoteCard = ({ note }: Props) => {
  const visibleTags = note.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTagCount = note.tags.length - visibleTags.length;

  const updatedDate = new Date(note.updated_at).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/notes/${note.id}`}
      className="group block h-full"
      aria-label={`Open note: ${note.title || "Untitled"}`}
    >
      <Card className="flex h-full min-h-64 flex-col overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-md">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="line-clamp-2 text-xl">
              {note.title || "Untitled"}
            </CardTitle>

            <span className="shrink-0 text-xs text-muted-foreground">
              {updatedDate}
            </span>
          </div>

          <CardDescription className="line-clamp-4 whitespace-pre-wrap break-words">
            {note.noteContentText.trim() || "No content yet."}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto pt-0">
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="max-w-32 truncate"
                >
                  {tag.name}
                </Badge>
              ))}

              {hiddenTagCount > 0 && (
                <Badge variant="outline">+{hiddenTagCount}</Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default NoteCard;
