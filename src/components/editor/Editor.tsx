import "./styles.scss";
import "./editor.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React from "react";
import HardBreak from "@tiptap/extension-hard-break";

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
  Save,
  LinkIcon,
  ImageIcon,
} from "lucide-react";
import Link from "@tiptap/extension-link";

type Props = {
  editor: any;
  setLink: Function;
  link: string;
};

const MenuBar = ({ editor, link, setLink }: Props) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

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

  return (
    <div className="flex place-content-center gap-2 p-2">
      <Button
        size={"iconCircle"}
        variant={!editor.isActive("codeBlock") ? "outline" : "default"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo2 className="w-4 h-4" />
      </Button>
      <Button
        size={"iconCircle"}
        variant={!editor.isActive("codeBlock") ? "outline" : "default"}
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
        size={"iconCircle"}
        variant={!editor.isActive("codeBlock") ? "outline" : "default"}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <Button
        size={"iconCircle"}
        variant={!editor.isActive("codeBlock") ? "outline" : "default"}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <FlagTriangleRight className="w-4 h-4" />
      </Button>
      <Button
        variant={"outline"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <CopyX className="w-4 h-4" />
      </Button>
      <Button
        variant={"outline"}
        size={"iconCircle"}
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <XCircle className="w-4 h-4" />
      </Button>

      <Button variant={"outline"} size={"iconCircle"} onClick={addImage}>
        <ImageIcon className="w-4 h-4" />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"iconCircle"} variant="outline">
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
  setContent: Function;
  content: string;
};

export default ({ setContent, content }: EditorPros) => {
  const [text, setText] = React.useState("");
  const [linkOpen, setLinkOpen] = React.useState(false);
  const [link, setLink] = React.useState("");

  const editor = useEditor({
    extensions: [
      HardBreak,
      Link,
      Image,
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
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar link={link} setLink={setLink} editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
