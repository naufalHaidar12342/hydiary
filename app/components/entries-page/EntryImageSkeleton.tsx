"use client"

import Image from "next/image";
import { useState } from "react";


export default function EntryImageSkeleton(
  { imageSource, imageAlternateText }:
    {
      imageSource: string;
      imageAlternateText: string
    }
) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative h-60 w-full overflow-hidden ">
      {!imageLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-hydiary-secondary/20"
        />
      )}

      <Image
        src={imageSource}
        alt={imageAlternateText}
        fill
        sizes="(max-width: 768px) 75vw, 100vw"
        className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
