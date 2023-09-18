"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import likeNote from "@/lib/global-note-actions/likeNote";
import checkLike from "@/lib/global-note-actions/checkLike";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Note from "@/lib/interfaces/Note";
import dislikeNote from "@/lib/global-note-actions/dislikeNote";
import getLikes from "@/lib/global-note-actions/getLikes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  note: Note;
};

const LikeButton = ({ note }: Props) => {
  const [isLiked, setIsLiked] = React.useState<Boolean>(false);
  const [likes, setLikes] = React.useState(note.likes);

  const { userId } = useAuth();
  const router = useRouter();

  const checkLikeNote = async () => {
    const likedNote = await checkLike(userId as string, note.id);
    setIsLiked(likedNote);
  };

  const getCurrentLikes = async () => {
    const likesNote = await getLikes(note.id);
    setLikes(likesNote);
  };
  useEffect(() => {
    checkLikeNote();
    getCurrentLikes();
  }, []);
  return (
    <div
      className="
   "
    >
      {isLiked ? (
        <Button
          onClick={() => {
            if (!userId) {
              throw new Error("You must be signed in to dislike notes!");
            }

            dislikeNote(userId as string, note.id);
            setIsLiked(false);
            setLikes(likes - 1);
          }}
          className="flex gap-2 items-center"
          variant={"secondary"}
        >
          <Heart fill="red" color="red" />
          <span>{likes}</span>
        </Button>
      ) : (
        <Button
          onClick={() => {
            if (!userId) {
              throw new Error("You must be signed in to like notes!");
            }
            likeNote(userId as string, note.id);
            setIsLiked(true);
            setLikes(likes + 1);
          }}
          className="flex gap-2 items-center"
          variant={"secondary"}
        >
          <Heart />
          <span>{likes}</span>
        </Button>
      )}
    </div>
  );
};

export default LikeButton;
