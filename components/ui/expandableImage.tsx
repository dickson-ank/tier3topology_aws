// components/ExpandableImage.tsx
import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { X } from 'lucide-react';

interface ExpandableImageProps extends ImageProps {
  expandedWidth?: number;
  expandedHeight?: number;
  disableExpand?: boolean;
}

const ExpandableImage: React.FC<ExpandableImageProps> = ({ 
  expandedWidth,
  expandedHeight,
  disableExpand = false,
  className = "",
  ...imageProps
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const openModal = (): void => {
    if (!disableExpand) {
      setIsExpanded(true);
    }
  };
  
  const closeModal = (): void => setIsExpanded(false);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isExpanded) {
        closeModal();
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  // If expand is disabled, return regular Image with all props
  if (disableExpand) {
    return <Image {...imageProps} className={className} />;
  }

  return (
    <>
      {/* Original Image - preserves ALL className and styling */}
      <Image
        {...imageProps}
        className={`cursor-pointer ${className}`}
        onClick={openModal}
      />

      {/* Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[10000] bg-white/20 rounded-full p-3 backdrop-blur-sm"
            aria-label="Close expanded image"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Expanded Image Container */}
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Image
              src={imageProps.src}
              alt={imageProps.alt}
              width={expandedWidth || (typeof imageProps.width === 'number' ? imageProps.width * 2 : 800)}
              height={expandedHeight || (typeof imageProps.height === 'number' ? imageProps.height * 2 : 600)}
              className="max-w-full max-h-full object-contain"
              quality={95}
              priority={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandableImage;
