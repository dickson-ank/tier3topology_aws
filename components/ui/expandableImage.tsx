// components/ExpandableImage.tsx
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface ExpandableImageProps extends Omit<ImageProps, 'onClick'> {
  expandedWidth?: number;
  expandedHeight?: number;
  disableExpand?: boolean;
}

const ExpandableImage: React.FC<ExpandableImageProps> = ({ 
  expandedWidth = 1200,
  expandedHeight = 800,
  disableExpand = false,
  className = "",
  style,
  ...imageProps
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const openModal = (): void => {
    if (!disableExpand) {
      setIsExpanded(true);
    }
  };
  
  const closeModal = (): void => setIsExpanded(false);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // If expand is disabled, return regular Image
  if (disableExpand) {
    return <Image {...imageProps} className={className} style={style} />;
  }

  return (
    <>
      {/* Original Image Container */}
      <div 
        className={`relative inline-block cursor-pointer group ${className}`}
        onClick={openModal}
        style={style}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openModal()}
      >
        <Image
          {...imageProps}
          className="transition-transform duration-200 group-hover:scale-105"
        />
        
        {/* Hover overlay with zoom icon */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </div>

      {/* Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby="expanded-image"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[10000] bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors backdrop-blur-sm"
            aria-label="Close expanded image"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Expanded Image Container */}
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Image
              src={imageProps.src}
              alt={imageProps.alt}
              width={expandedWidth}
              height={expandedHeight}
              className="max-w-full max-h-full object-contain"
              priority={true}
              quality={95}
              id="expanded-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExpandableImage;