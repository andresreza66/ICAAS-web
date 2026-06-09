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
        <React.Fragment>
          <iframe
            src={src}
            className={`${className} w-full h-full`}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Google Maps"
          ></iframe>
          {/* Custom high-contrast floating button to ensure user gets sent to the exact correct map pin on all devices - hidden on desktop where the integrated card button is shown */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden">
            <a 
              href="https://maps.app.goo.gl/TPREQbzwRfBHstkQ6?g_st=ic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-[11px] font-black uppercase tracking-widest px-5 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
            >
              <MapPin size={14} className="animate-pulse text-white" />
              Abrir en Google Maps
            </a>
          </div>
        </React.Fragment>
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
