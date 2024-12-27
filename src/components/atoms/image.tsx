// File: components/ImageDisplay.tsx

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageDisplayProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  src,
  alt,
  className = "",
}) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!(src && src.length > 0)) setIsError(true);
  }, [src]);

  return (
    <div
      className={`w-full aspect-[9/6] overflow-hidden bg-gray-200 ${className}`}
    >
      {src && src.length > 0 ? (
        <Image
          height={300}
          width={300}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setIsError(true)}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-48 bg-green-100 text-gray-500">
          Image non disponible
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
