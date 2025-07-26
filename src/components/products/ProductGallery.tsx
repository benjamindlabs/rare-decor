
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  return (
    <div className="space-y-4">
      <div 
        className={`aspect-square w-full overflow-hidden premium-card cursor-zoom-in relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={toggleZoom}
        onMouseMove={handleImageMouseMove}
      >
        <img 
          src={mainImage} 
          alt={name} 
          className={`w-full h-full object-cover object-center transition-transform duration-200 ${
            isZoomed ? 'scale-150' : ''
          }`}
          style={
            isZoomed 
              ? { 
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />
        {isZoomed && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
            Click to exit zoom
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={`aspect-square premium-card overflow-hidden ${
              mainImage === image ? 'ring-2 ring-accent' : ''
            }`}
            onClick={() => setMainImage(image)}
          >
            <img 
              src={image} 
              alt={`${name} - View ${index + 1}`} 
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
