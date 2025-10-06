import { ReactNode } from "react"


interface ImageAttributes{
    src: string
    alt: string
    className?: string
    children?: ReactNode

    selectedImage: (src: string) => void
}

export function ImageContainer({src, alt, className, children, selectedImage} : ImageAttributes){
    return(

        <div className={`bg-card my-6 border border-border rounded-lg p-1 ${className}`}>
            <img
            src={src}
            alt={alt}
            className="w-full h-auto rounded cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => selectedImage(src)}
            />
            
            {children}
        </div>

    )
}
