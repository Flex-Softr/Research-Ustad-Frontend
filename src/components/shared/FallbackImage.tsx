"use client";
import Image from "next/image";
import { useState } from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

const FallbackImage = ({
  src,
  alt,
  className,
  width = 5000,
  height = 600,
  ...props
}: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc("/Cover1.png")} // 👈 fallback in /public
    />
  );
};

export default FallbackImage;
