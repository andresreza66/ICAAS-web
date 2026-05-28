import React, { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface LazyMapProps {
  src: string;
  className?: string;
}

export function LazyMap({ src, className = "" }: LazyMapProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px", // Trigger loading slightly before it rolls into focus
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#12151d]/60">
      {shouldLoad ? (
        <iframe
          src={src}
          className={`${className} w-full h-full`}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Google Maps"
        ></iframe>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/50 bg-[#12151d]/40 select-none">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-8 w-8 rounded-full bg-primary/20 animate-ping opacity-75"></span>
            <MapPin size={28} className="text-primary relative z-10" />
          </div>
          <span className="text-[10px] tracking-widest uppercase font-light">Cargando mapa interactivo...</span>
        </div>
      )}
    </div>
  );
}
