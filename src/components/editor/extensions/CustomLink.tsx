import { Link as TipTapLink } from "@tiptap/extension-link";
import { mergeAttributes } from "@tiptap/react";
import Link from "next/link";

export const CustomLink = TipTapLink.extend({
  renderHTML({ HTMLAttributes }) {
    return ["Link", mergeAttributes(Link, HTMLAttributes), 0];
  },
});
