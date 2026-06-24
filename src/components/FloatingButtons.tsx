import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '../lib/analytics';

export default function FloatingButtons() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isVisible, setIsVisible] = useState(false);

  // Hide on contact page
  const isContactPage = pathname === '/contacto' || pathname.startsWith('/contacto');

  // Check if a blog post is open
  const searchParams = new URLSearchParams(location.search);
  const isBlogOpen = pathname.startsWith('/blog') && !!searchParams.get('id');

  useEffect(() => {
    if (isContactPage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const thresholdTop = 200; // Hide when in the top viewport section of each page
      const thresholdBottom = 340; // Hide when we reach the footer at the bottom
      
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      const isNearTop = scrollY < thresholdTop;
      const isNearBottom = (docHeight - scrollY - winHeight) < thresholdBottom;

      setIsVisible(!isNearTop && !isNearBottom);
    };

    // Run initially & bind listeners
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isContactPage, pathname]);

  if (isContactPage) {
    return null;
  }

  let whatsappUrl = "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n.";
  let careerLabel = "general";
  if (pathname === '/sobrecargo') {
    whatsappUrl = "https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n%20de%20la%20carrera%20de%20Sobrecargo%20de%20Aviaci%C3%B3n.";
    careerLabel = "sobrecargo";
  } else if (pathname === '/oficial') {
    whatsappUrl = "https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n%20de%20la%20carrera%20de%20Oficial%20de%20Operaciones.";
    careerLabel = "oficial";
  }

  const handleSocialClick = (platform: string) => {
    trackEvent('floating_button', 'click_social', `${platform}_${careerLabel}`);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed bottom-5 right-5 z-[100] ${isBlogOpen ? 'hidden md:flex' : 'flex'} flex-row md:flex-col gap-2.5 select-none items-center`}
        >
          {/* Facebook Button */}
          <a 
            href="https://www.facebook.com/profile.php?id=61587870480575&mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('facebook')}
            className="bg-[#1877F2]/90 hover:bg-[#1877F2] text-white w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative border border-white/5 active:scale-95"
            aria-label="Facebook"
          >
            <Facebook className="size-5" fill="currentColor" />
            <span className="absolute right-full mr-3 bg-[#161a25] text-white text-[9px] font-black px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10 pointer-events-none uppercase tracking-widest hidden md:block">
              Síguenos en Facebook
            </span>
          </a>

          {/* Instagram Button */}
          <a 
            href="https://www.instagram.com/icaascancun?igsh=MWRnN2F4aHcyMWUzcw%3D%3D&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('instagram')}
            className="bg-gradient-to-tr from-[#f09433]/90 via-[#dc2743]/90 to-[#bc1888]/90 hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative border border-white/5 active:scale-95"
            aria-label="Instagram"
          >
            <Instagram className="size-5" />
            <span className="absolute right-full mr-3 bg-[#161a25] text-white text-[9px] font-black px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10 pointer-events-none uppercase tracking-widest hidden md:block">
              Síguenos en Instagram
            </span>
          </a>

          {/* WhatsApp Button */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('whatsapp')}
            className="bg-[#25D366]/90 hover:bg-[#25D366] text-white w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative border border-white/5 active:scale-95"
            aria-label="WhatsApp"
          >
            <MessageCircle className="size-5" fill="currentColor" />
            <span className="absolute right-full mr-3 bg-[#161a25] text-white text-[9px] font-black px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10 pointer-events-none uppercase tracking-widest hidden md:block">
              Chatea con nosotros
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
