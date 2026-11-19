"use client"

import { useEffect, useState } from "react"
import styles from "../../entries/imageLightbox.module.css"
import Image from "next/image"
import { SquareX } from "lucide-react"

function ImageWithSkeleton({ src, alt, size }: {
  src: string
  alt: string
  size: "thumbnail"| "large"
}) {
  const [imageLoaded, setImageLoaded]=useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
    setImageFailed(false)
  },[src])

  return (
    <div className={`${size==="large"?"w-[min(90vw,62.5rem)] h-[min(70vh,43.75rem)]":""} w-full h-60 relative overflow-hidden `}>
      {!imageLoaded && !imageFailed && <span className={`absolute inset-0 animate-pulse bg-hydiary-secondary/20`} aria-hidden="true" />}
      {imageFailed ? (
        <span className={`p-4`}>Image couldn’t be loaded.</span>
      ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className={`${size==="thumbnail"?"object-cover":"object-cover"}`}
            onLoad={() => setImageLoaded(true)}
            onError={()=>setImageFailed(true)}
          />
      )}
    </div>
  )
}


export default function MarkdownImage({ src, alt }:
  { src?: string; alt?: string }
) {
  const [openModal, setModalOpen] = useState(false)
  const imageSrc = src ?? ""
  const imageCaption = alt ?? ""

  useEffect(() => {
    if (!openModal) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key==="Escape") {
        setModalOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [openModal])

  if (!imageSrc) {
    return null
  }

  /**
   * empty tag here is React Fragment.
   * the purpose is to let this function
   * return multiple elements,
   * instead of just one element
   *
   */
  return (
    <>
      <button
        type="button"
        className={`flex p-0 border-0 h-full w-full cursor-pointer`}
        onClick={() => setModalOpen(true)}
        aria-label={`View image in larger size`}
      >
        <ImageWithSkeleton src={imageSrc} alt={imageCaption} size="thumbnail"/>
      </button>
      {openModal && (
        <div className={styles.backdrop} onClick={() => setModalOpen(false)}>
          <section
            className={`relative h-190 w-300 max-w-full p-4 bg-hydiary-secondary border border-hydiary-secondary rounded-sm`}
            role="dialog"
            aria-modal="true"
            aria-label={imageCaption || "Enlarged image"}
            onClick={(event)=>event.stopPropagation()}
          >
            <button
              type="button"
              className={`absolute -top-4 -right-16 -z-1 text-[1.75rem] cursor-pointer`}
              onClick={() => setModalOpen(false)}
              aria-label="Close this image"
            >
              <SquareX className="text-hydiary-accent" size={48} />
            </button>
            <ImageWithSkeleton src={imageSrc} alt={imageCaption} size="large" />
            {imageCaption && <span className="text-hydiary-primary font-(family-name:--font-caveat) font-medium text-3xl">{ imageCaption}</span>}
          </section>
        </div>
      )}
    </>
  )
}
