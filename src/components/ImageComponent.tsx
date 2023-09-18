"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps extends React.HTMLAttributes<HTMLElement> {
  width: number;
  height: number;
  alt: string;
  src: string;
}
const imageLoader = ({ src }: { src: string }) => {
  return src;
};
const ImageComponent = ({ className, src, width, height, alt }: ImageProps) => {
  return (
    <Image
      className={cn(className, "relative rounded-md")}
      loader={imageLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default ImageComponent;
