import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  desc: string;
}

interface GalleryProps {
  categories: Category[];
  categoryImages: Record<string, string[]>;
  defaultTab?: string;
  theme?: 'light' | 'dark';
}

export function Gallery({ categories, categoryImages, defaultTab, theme = 'light' }: GalleryProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || categories[0]?.id || '');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Auto-advance carousel
  useEffect(() => {
    const currentImages = categoryImages[activeTab] || [];
    if (currentImages.length <= 1) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTab, categoryImages]);

  // Reset carousel index when tab changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeTab]);

  const currentImages = categoryImages[activeTab] || [];
  const imagesWithSrc = currentImages;

  return (
    <div className="gallery-component relative">
      {/* Category Selection */}
      <div className="mb-6">
        {/* Mobile Dropdown */}
        <div className="block sm:hidden max-w-xs mx-auto">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => {
                setActiveTab(e.target.value);
                setCarouselIndex(0);
                setActiveImageIdx(null);
              }}
              className={`w-full appearance-none border text-xs font-bold uppercase tracking-widest py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm ${
                theme === 'dark'
                  ? 'bg-[#12151d]/80 border-white/20 text-white shadow-black/20'
                  : 'bg-white border-gray-200 text-secondary'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
        
        {/* Desktop Tabs */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setCarouselIndex(0);
                setActiveImageIdx(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat.id
                  ? theme === 'dark'
                    ? 'bg-primary text-secondary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                  : theme === 'dark'
                    ? 'bg-[#12151d]/40 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                    : 'bg-gray-50 text-gray-500 hover:text-secondary border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Description */}
      <div className="text-center mb-10 max-w-2xl mx-auto min-h-[40px]">
        <p className={`text-xs sm:text-sm font-light italic leading-relaxed ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          "{categories.find(c => c.id === activeTab)?.desc}"
        </p>
      </div>

      {/* Sleek Carousel Container */}
      {(() => {
        if (imagesWithSrc.length === 0) {
          return (
            <div className={`h-60 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center max-w-4xl mx-auto ${
              theme === 'dark' ? 'bg-neutral-900/30 border-white/10' : 'bg-gray-50 border-gray-200'
            }`}>
              <ImageIcon size={32} className="text-gray-500 mb-3" />
              <p className="text-xs text-gray-500">Próximamente más imágenes disponibles.</p>
            </div>
          );
        }

        const currentItem = imagesWithSrc[carouselIndex] || imagesWithSrc[0];

        return (
          <div className="relative max-w-4xl mx-auto flex flex-col items-center">
            {/* Main Visual Frame */}
            <div className={`relative w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden border shadow-xl group ${
              theme === 'dark' ? 'bg-neutral-950/85 border-white/10 shadow-2xl' : 'bg-gray-100 border-gray-200'
            }`}>
              <AnimatePresence>
                <motion.div
                  key={`${activeTab}-${carouselIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {currentItem && (
                    <div className="relative w-full h-full bg-[#12151d]">
                      {/* Image is always rendered so that the AI Studio edit overlay can detect it and let the user replace/upload images */}
                      <img
                        src={currentItem}
                        alt={`Vista ${categories.find(c => c.id === activeTab)?.label}`}
                        className={`w-full h-full object-cover cursor-zoom-in transition-all duration-700 group-hover:scale-105 absolute inset-0 z-0 ${
                          loadedImages[currentItem] ? 'opacity-100' : 'opacity-20'
                        }`}
                        onClick={() => setActiveImageIdx(carouselIndex)}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onLoad={() => setLoadedImages(prev => ({ ...prev, [currentItem]: true }))}
                        onError={() => setFailedImages(prev => ({ ...prev, [currentItem]: true }))}
                      />

                      {!loadedImages[currentItem] && !failedImages[currentItem] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/90 animate-pulse z-10 pointer-events-none">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cargando vista...</p>
                        </div>
                      )}

                      {failedImages[currentItem] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 p-6 text-center z-10 border border-white/10 rounded-3xl pointer-events-none">
                          <ImageIcon className="text-primary size-10 mb-3 stroke-[1.5] animate-pulse" />
                          <p className="text-[10px] font-black text-white uppercase tracking-wider mb-1">Instalación - ICAAS</p>
                          <p className="text-[9px] text-gray-500 max-w-[200px] leading-relaxed">Esta imagen se está actualizando o está temporalmente fuera de línea.</p>
                          <p className="text-[8px] text-primary/80 mt-2 uppercase tracking-widest font-mono font-bold">Haz clic aquí para subir una nueva imagen</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Left Arrow Button */}
              {imagesWithSrc.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex((carouselIndex + imagesWithSrc.length - 1) % imagesWithSrc.length);
                  }}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg border transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100 z-20 flex justify-center items-center ${
                    theme === 'dark'
                      ? 'bg-black/50 hover:bg-primary/95 text-white hover:border-transparent border-white/10'
                      : 'bg-white/80 hover:bg-white text-secondary border-gray-200'
                  }`}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={20} className="ml-[-2px]" />
                </button>
              )}

              {/* Right Arrow Button */}
              {imagesWithSrc.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex((carouselIndex + 1) % imagesWithSrc.length);
                  }}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg border transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100 z-20 flex justify-center items-center ${
                    theme === 'dark'
                      ? 'bg-black/50 hover:bg-primary/95 text-white hover:border-transparent border-white/10'
                      : 'bg-white/80 hover:bg-white text-secondary border-gray-200'
                  }`}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={20} className="mr-[-2px]" />
                </button>
              )}
            </div>

            {/* Interactive Thumbnail Strip */}
            {imagesWithSrc.length > 1 && (
              <div className="mt-6 flex justify-center gap-2 overflow-x-auto max-w-full py-2 px-4 scrollbar-none scroll-smooth">
                {imagesWithSrc.map((image, idx) => {
                  const isActive = idx === carouselIndex;
                  return (
                    <div
                      key={idx}
                      className={`relative w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-300 border-2 ${
                        isActive
                          ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-lg'
                          : theme === 'dark'
                            ? 'border-white/15 opacity-80 hover:opacity-100 cursor-pointer'
                            : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105 cursor-pointer'
                      }`}
                      onClick={() => {
                        setCarouselIndex(idx);
                      }}
                    >
                      {image && (
                        <div className="w-full h-full relative group/thumb bg-neutral-900">
                          <img
                            src={image}
                            alt="Miniatura"
                            className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 absolute inset-0 z-0 ${
                              loadedImages[image] ? 'opacity-100' : 'opacity-20'
                            }`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onLoad={() => setLoadedImages(prev => ({ ...prev, [image]: true }))}
                            onError={() => setFailedImages(prev => ({ ...prev, [image]: true }))}
                          />
                          {!loadedImages[image] && !failedImages[image] && (
                            <div className="absolute inset-0 bg-neutral-900 animate-pulse z-10 pointer-events-none" />
                          )}
                          {failedImages[image] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-10 pointer-events-none">
                              <ImageIcon size={16} className="text-gray-500 animate-pulse" />
                            </div>
                          )}
                          {!isActive && (
                            <div className="absolute inset-0 bg-white/20 group-hover/thumb:bg-transparent transition-colors z-20 pointer-events-none" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* Lightbox / Zoom Dialog for Facilities */}
      <AnimatePresence>
        {activeImageIdx !== null && (() => {
          const currentItem = imagesWithSrc[activeImageIdx];
          if (!currentItem) return null;
          return (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                onClick={() => setActiveImageIdx(null)}
              />
              {/* Main Modal Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveImageIdx(null)}
                  className="absolute -top-12 right-0 sm:-right-12 sm:top-0 bg-white/10 hover:bg-primary text-white p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-300 z-50 border border-white/20 hover:border-transparent hover:scale-110"
                >
                  <X size={24} />
                </button>

                <div className="relative w-full h-full rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl bg-black border border-white/10 flex items-center justify-center p-2">
                  <img
                    src={currentItem}
                    alt="Vista de instalación"
                    className="max-h-[85vh] max-w-full object-contain rounded-xl sm:rounded-[24px]"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Left Navigation inside Lightbox */}
                  {imagesWithSrc.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx((activeImageIdx + imagesWithSrc.length - 1) % imagesWithSrc.length);
                      }}
                      className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-3 sm:p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 hover:border-transparent hover:scale-110"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}

                  {/* Right Navigation inside Lightbox */}
                  {imagesWithSrc.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx((activeImageIdx + 1) % imagesWithSrc.length);
                      }}
                      className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary text-white p-3 sm:p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20 hover:border-transparent hover:scale-110"
                    >
                      <ChevronRight size={24} />
                    </button>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  {imagesWithSrc.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIdx ? 'w-8 bg-primary' : 'w-2 bg-white/30'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
