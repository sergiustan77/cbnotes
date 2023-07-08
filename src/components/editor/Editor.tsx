import "./styles.scss";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import ImageResize from "./image";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React from "react";
import HardBreak from "@tiptap/extension-hard-break";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  CopyX,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  XCircle,
  List,
  ListOrdered,
  TerminalSquare,
  Quote,
  Minus,
  FlagTriangleRight,
  Undo2,
  Redo2,
  LinkIcon,
  ImageIcon,
  Scaling,
  Video,
  Check,
  Loader2,
} from "lucide-react";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import { ImageDialog } from "./ImageDialog";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

type Props = {
  editor: any;
  setLink: Function;
  link: string;
  videoLink: string;
  setVideoLink: Function;
  savedStatus: string;
};

const MenuBar = ({
  editor,
  link,
  setLink,
  videoLink,
  setVideoLink,
  savedStatus,
}: Props) => {
  const [isImageFromDevice, setIsImageFromDevice] = React.useState(false);
  const getEditor = () => {
    return editor;
  };
  if (isImageFromDevice) {
  }

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (link === null) {
      return;
    }

    // empty
    if (link === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: link, class: "note-link" })
      .run();

    setLink("");
  };

  const addVideo = () => {
    if (videoLink === null) {
      return;
    }

    // empty

    // update link
    editor.commands.setYoutubeVideo({
      src: videoLink,
    });
    setVideoLink("");
  };

  return (
    <div className="flex   place-content-center flex-wrap gap-2 p-2 w-full ">
      <Button
        size={"iconCircle"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo2 className="w-4 h-4" />
      </Button>
      <Button
        size={"iconCircle"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo2 className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("bold") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("italic") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("strike") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough className="w-4 h-4" />
      </Button>
      <Button
        variant={
          !editor.isActive("heading", { level: 1 }) ? "outline" : "default"
        }
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <Heading1 className="w-4 h-4" />
      </Button>
      <Button
        variant={
          !editor.isActive("heading", { level: 2 }) ? "outline" : "default"
        }
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <Heading2 className="w-4 h-4" />
      </Button>
      <Button
        variant={
          !editor.isActive("heading", { level: 3 }) ? "outline" : "default"
        }
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <Heading3 className="w-4 h-4" />
      </Button>
      <Button
        variant={
          !editor.isActive("heading", { level: 4 }) ? "outline" : "default"
        }
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <Heading4 className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("paragraph") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <Pilcrow className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("code") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <Code className="w-4 h-4" />
      </Button>

      <Button
        variant={!editor.isActive("bulletList") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("orderedList") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("codeBlock") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <TerminalSquare className="w-4 h-4" />
      </Button>
      <Button
        variant={!editor.isActive("blockquote") ? "outline" : "default"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <Quote className="w-4 h-4" />
      </Button>
      <Button
        className="hidden md:flex"
        size={"iconCircle"}
        variant={!editor.isActive("codeBlock") ? "outline" : "default"}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <Button
        size={"iconCircle"}
        className="hidden md:flex"
        variant={!editor.isActive("codeBlock") ? "outline" : "default"}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <FlagTriangleRight className="w-4 h-4" />
      </Button>
      <Button
        className="hidden md:flex"
        variant={"outline"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <CopyX className="w-4 h-4" />
      </Button>
      <Button
        className="hidden md:flex"
        variant={"outline"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <XCircle className="w-4 h-4" />
      </Button>

      <ImageDialog editor={getEditor()} />

      <Dialog>
        <DialogTrigger asChild>
          <Button size={"iconCircle"}>
            <Video className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Video URL</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={videoLink}
                onChange={(e) => {
                  setVideoLink(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogTrigger asChild>
            <Button onClick={addVideo} type="submit">
              Add video
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"iconCircle"}>
            <LinkIcon className="w-4 h-4"></LinkIcon>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Link URL</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogTrigger asChild>
            <Button onClick={addLink} type="submit">
              Add link
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
};

type EditorPros = {
  noteId: string;
  userId: string;

  setContent: Function;
  content: string;
  setNoteContentText: Function;
};

const Editor = ({
  setContent,
  content,
  setNoteContentText,
  noteId,
  userId,
}: EditorPros) => {
  const [link, setLink] = React.useState("");
  const [videoLink, setVideoLink] = React.useState("");
  const [savedStatus, setSavedStatus] = React.useState("Saved");

  const router = useRouter();

  const updateNote = async (
    id: string,

    content: string,
    noteContentText: string,
    userId: string
  ) => {
    const res = await fetch("/api/notes/update", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        userId: userId,

        content: content,
        noteContentText: noteContentText,
      }),
    }).then(() => {
      router.refresh();
    });
  };

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const noteHTML = editor.getHTML();
    const noteContentText = editor.getText();
    setContent(noteHTML);
    setNoteContentText(noteContentText);
    await updateNote(noteId, noteHTML, noteContentText, userId);
    // Simulate a delay in saving.

    setTimeout(() => {
      setSavedStatus("Saved");
    }, 500);
  }, 1000);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "md:border mt-4 md:mt-0 w-full md:rounded-md md:p-6 min-h-screen focus:outline-none",
      },
    },

    extensions: [
      Youtube.configure({
        HTMLAttributes: {
          class: "aspect-video w-[60%] bg-gray-400 dark:bg-gray-800 rounded-md",
        },
      }),
      HardBreak,
      Link,
      Image.configure({
        inline: false,

        HTMLAttributes: {
          class: "w-fit h-fit  ",
        },
      }),
      ImageResize.configure({
        inline: false,

        resizeIcon: <Scaling className="h-6 w-6" />,
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({}),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: content,
    onUpdate: (e) => {
      setSavedStatus("Saving");

      debouncedUpdates(e);
    },
  });

  return (
    <div className="w-full flex flex-col gap-2 ">
      {" "}
      <div className="w-full flex place-content-center  sticky top-16 z-[50] ">
        <div className="w-fit border rounded-lg bg-background">
          <MenuBar
            setVideoLink={setVideoLink}
            videoLink={videoLink}
            link={link}
            setLink={setLink}
            editor={editor}
            savedStatus={savedStatus}
          />
        </div>
      </div>
      <div className="w-full">
        {" "}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
