import {
  NodeHandler,
  NodeHandlers,
  TipTapNode,
  TipTapRender,
} from "@troop.com/tiptap-react-render";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const doc: NodeHandler = (props) => {
  return <>{props.children}</>;
};

const paragraph: NodeHandler = (props) => {
  return <p>{props.children}</p>;
};

const text: NodeHandler = (props) => {
  return <span>{props.children}</span>;
};

const img: NodeHandler = (props) => {
  const { src, alt, title } = props.node;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{
        backgroundSize: "contain",
      }}
    />
  );
};

const a: NodeHandler = (props) => {
  const { href } = props.node;
  return <Link href={href}>{props.children}</Link>;
};
const NoteDisplayHandlers: NodeHandlers = {
  doc: doc,
  text: text,
  paragraph: paragraph,
  img: img,
  a: a,
};

type Props = {
  data: TipTapNode;
};

const Renderer = ({ data }: Props) => {
  return (
    <div>
      <TipTapRender handlers={NoteDisplayHandlers} node={data}></TipTapRender>
    </div>
  );
};

export default Renderer;
