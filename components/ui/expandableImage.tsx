"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { X } from "lucide-react";

type ExpandableImageProps = ImageProps; // 1️⃣ inherit all props from next/image

export default function ExpandableImage(props: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

    // ESC closes modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openModal = () => setIsExpanded(true);
  const closeModal = () => setIsExpanded(false);

  return (
    <>
      {/* Thumbnail behaves like <Image /> */}
      <div
        className={`relative cursor-pointer group ${props.className ?? ""}`}
        onClick={openModal}
      >
        <Image
          {...props} // 2️⃣ spread all next/image props
          className={`${props.className ?? ""}`}
        />

      </div>

      {/* Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[60] bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            aria-label="Close expanded image"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Expanded image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={props.src}
              alt={props.alt}
              fill // 🔑 expand inside container
              sizes="100vw"
              className={`object-contain ${props.className ?? ""}`}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
