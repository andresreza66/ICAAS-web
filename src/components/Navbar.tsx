import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/images/regenerated_image_1777580804672_opt.png';

export default function Navbar({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (currentPath === '/cursos' || currentPath === '/sobrecargo' || currentPath === '/oficial') {
      setActiveSection('oferta');
    } else if (currentPath === '/nosotros') {
      setActiveSection('nosotros');
    } else if (currentPath === '/contacto') {
      setActiveSection('contacto');
    } else if (currentPath === '/' || currentPath === '') {
      setActiveSection('inicio');
    } else {
      setActiveSection('');
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsOpen(false);
    if (path.startsWith('#')) {
      if (currentPath !== '' && currentPath !== '/') {
        navigate('/' + path);
        return;
      }
      e.preventDefault();
      const id = path.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (currentPath === route) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        e.preventDefault();
        navigate(path);
      }
    } else {
      e.preventDefault();
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  };

  const navLinks = [
    { name: 'Inicio', id: 'inicio', path: '/' },
    { 
      name: 'Oferta Académica', 
      id: 'oferta', 
      path: '#carreras',
      subItems: [
        { name: 'Sobrecargo de Aviación', path: '/sobrecargo' },
        { name: 'Oficial de Operaciones', path: '/oficial' },
        { name: 'Cursos y especialización', path: '/cursos' },
      ]
    },
    { 
      name: 'Nosotros', 
      id: 'nosotros', 
      path: '/nosotros'
    },
    { name: 'Contacto', id: 'contacto', path: '/contacto' },
  ];

  return (
    <>
      {/* Backdrop for closing when clicking outside (independent of transformed nav parent) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav
        id={id}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500"
      >
      <div 
        className={`w-full flex justify-between items-center px-5 py-1.5 rounded-2xl transition-all duration-500 border ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-gray-200 shadow-2xl scale-100' 
            : 'bg-white/10 backdrop-blur-md border-white/10 shadow-lg scale-[1.02]'
        }`}
      >
        <a 
          href="#inicio" 
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="flex items-center gap-2 lg:gap-3 group shrink-0 relative z-10"
        >
          <img 
            src={logoImg} 
            alt="ICAAS Logo" 
            className="w-10 h-10 lg:w-14 lg:h-14 object-contain group-hover:scale-110 transition-transform"
            fetchPriority="high"
            decoding="async"
          />
          <div className="leading-none">
            <p className={`font-black tracking-tighter text-sm lg:text-base uppercase transition-colors ${isScrolled ? 'text-secondary' : 'text-white'}`}>ICAAS</p>
            <p className="text-[7px] lg:text-[8px] text-gray-400 tracking-[0.2em] lg:tracking-[0.3em] font-bold uppercase">Escuela de aviación</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const hasSubItems = link.subItems && link.subItems.length > 0;
            
            return (
              <div 
                key={link.path} 
                className="relative group/item"
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <a
                  href={link.path}
                   onClick={(e) => handleLinkClick(e, link.path)}
                  className={`text-[8px] lg:text-[9px] uppercase tracking-[0.2em] font-black transition-all hover:text-primary flex items-center gap-1 py-2 ${
                    isActive 
                      ? 'text-primary' 
                      : isScrolled 
                        ? 'text-secondary/60' 
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {hasSubItems && <ChevronDown size={10} className="group-hover/item:rotate-180 transition-transform" />}
                </a>

                {hasSubItems && (
                  <AnimatePresence>
                    {hoveredLink === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 min-w-[180px] p-2"
                      >
                         {link.subItems.map((subItem) => (
                           <a
                             key={subItem.path}
                             href={subItem.path}
                             onClick={(e) => handleLinkClick(e, subItem.path)}
                             className="block px-4 py-3 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-secondary hover:bg-neutral hover:text-primary rounded-xl transition-all"
                           >
                              {subItem.name}
                           </a>
                         ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
          <a
            href="https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-3 py-2 lg:px-5 lg:py-2 rounded text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] hover:bg-secondary transition-all shadow-lg shadow-primary/20"
          >
            Inscríbete
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${isScrolled ? 'text-secondary' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-4 right-0 w-[80%] max-w-[280px] bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-2 md:hidden border border-gray-100 max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const hasSubItems = link.subItems && link.subItems.length > 0;

              return (
                <div key={link.path} className="flex flex-col">
                  {hasSubItems ? (
                    <button
                      className={`text-sm font-black uppercase tracking-widest transition-colors py-3 border-b border-gray-50 flex justify-between items-center w-full text-left ${
                        isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                      onClick={() => setMobileExpanded(mobileExpanded === link.id ? null : link.id)}
                    >
                      {link.name}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${mobileExpanded === link.id ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  ) : (
                    <a
                      href={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      className={`text-sm font-black uppercase tracking-widest transition-colors py-3 border-b border-gray-50 flex justify-between items-center ${
                        isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </a>
                  )}
                  
                  <AnimatePresence>
                    {hasSubItems && mobileExpanded === link.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-neutral/30 rounded-xl px-4 mt-1"
                      >
                        <div className="flex flex-col gap-1 py-3">
                           {link.subItems.map((subItem) => (
                             <a
                               key={subItem.path}
                               href={subItem.path}
                               onClick={(e) => handleLinkClick(e, subItem.path)}
                               className="text-xs font-bold uppercase tracking-widest text-gray-500 py-2.5 hover:text-primary transition-colors border-b border-gray-100 last:border-0"
                             >
                                {subItem.name}
                             </a>
                           ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <a
              href="https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-4 rounded-2xl text-center font-black uppercase tracking-widest text-[10px] shadow-primary-glow mt-2"
              onClick={() => setIsOpen(false)}
            >
              Inscríbete hoy
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}
