import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, Trash } from "lucide-react";
import LinkNotesSearch from "../LinkNotesSearch";
import { Textarea } from "../ui/textarea";
import Note from "@/lib/interfaces/Note";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

type Props = {
  setUpdate: Function;
  note: Note;
  update: boolean;
  userId: string;
};

const LinkNoteDialog = ({ note, setUpdate, update, userId }: Props) => {
  const [linkToDescription, setLinkToDescription] = React.useState("");
  const [linkTo, setLinkTo] = React.useState<Note>();
  const linkNotes = async () => {
    const res = fetch("/api/notes/link", {
      method: "POST",
      body: JSON.stringify({
        note: note.id,
        linkTo: linkTo,
        linkDescription: linkToDescription,
        userId: userId,
      }),
    }).then(() => {
      setUpdate(!update);
      setLinkTo(undefined);
      setLinkToDescription("");
    });
  };
  return (
    <div>
      <DropdownMenuItem>
        <DialogTrigger>
          <Link className="mr-2 h-4 w-4" />
          <span>Link Notes</span>
        </DialogTrigger>
      </DropdownMenuItem>
      <DialogContent className="w-full grid place-items-center ">
        <DialogHeader className="w-full ">
          <DialogTitle>Link this note to other notes</DialogTitle>
          <DialogDescription>
            Creating links between notes can improve your organization and
            thinking process!
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col gap-4 py-4 w-full  ">
          <div className="">
            {" "}
            <Label
              htmlFor="linkTo"
              className="text-right w-full  flex items-end place-content-between"
            >
              <div className="flex items-end text-lg ">Link to</div>

              {linkTo && (
                <div className="flex items-end">
                  {" "}
                  <Button
                    onClick={() => {
                      setLinkTo(undefined);
                      setLinkToDescription("");
                    }}
                    className="h-6 w-6"
                    variant={"ghost"}
                    size={"iconCircleSmall"}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </Label>
            <div id="linkTo" className="w-full">
              <LinkNotesSearch
                update={update}
                userId={userId as string}
                selectedNote={linkTo}
                setSelectedNote={setLinkTo}
                note={note}
              />
            </div>
          </div>
          {linkTo && (
            <div className="flex flex-col gap-2 w-full ">
              <Label className="text-lg" htmlFor="linkToDesc">
                Description
              </Label>
              <Textarea
                className=" resize-none"
                id="linkToDesc"
                value={linkToDescription}
                onChange={(e) => {
                  setLinkToDescription(e.target.value);
                }}
              />
            </div>
          )}
        </div>
        {linkTo && (
          <DialogFooter className="w-full ">
            <DialogTrigger className="w-full">
              {" "}
              <Button className="w-full" onClick={linkNotes} type="submit">
                Link
              </Button>
            </DialogTrigger>
          </DialogFooter>
        )}
      </DialogContent>
    </div>
  );
};

export default LinkNoteDialog;
