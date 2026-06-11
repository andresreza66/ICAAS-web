import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import {   Award, Shield, Users, ArrowRight, CheckCircle2, Zap,
  HelpCircle, ChevronDown, Image, Building, School, Info, Star,
  Phone, MapPin
} from 'lucide-react';
import { LazyMap } from '../components/LazyMap';

// Import local assets for building layout correctly
import fac1Img from '../assets/images/regenerated_image_1777904478940.jpg'; 
import fac2Img from '../assets/images/regenerated_image_1777925795640.png';
import fac3Img from '../assets/images/regenerated_image_1777925799329.jpg';
import fac4Img from '../assets/images/regenerated_image_1777628082337_opt.jpg';
import fac5Img from '../assets/images/regenerated_image_1779992817546.png';
import fac6Img from '../assets/images/regenerated_image_1777733645280_opt.jpg';
import fac7Img from '../assets/images/regenerated_image_1777586277135_opt.png';

export default function Nosotros({ id }: { id: string }) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  useSEO({
    title: "Nosotros y Convenios de Aviación | Escuela ICAAS Cancún",
    description: "Conoce a ICAAS, escuela de aviación en Cancún liderando el adiestramiento aeronáutico del sureste. Nuestra historia, valores, simuladores y convenios con aerolíneas.",
    path: "/nosotros",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Acerca de ICAAS Escuela de Aviación",
      "description": "Detalles históricos, valores de excelencia en adiestramiento aéreo, infraestructura con simuladores e información corporativa de ICAAS.",
      "url": "https://vuela-icaas.com/nosotros"
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  const coreValues = [
    {
      title: "Seguridad",
      desc: "Nuestra máxima directriz operacional. Capacitamos para prevenir y dominar cualquier contingencia con calma y precisión técnica.",
      icon: Shield
    },
    {
      title: "Eficiencia",
      desc: "Optimizamos cada proceso operativo y de aprendizaje para brindar un adiestramiento estructurado, puntual y de excelencia.",
      icon: Zap
    },
    {
      title: "Liderazgo",
      desc: "Desarrollamos el carácter, la disciplina y las habilidades de mando necesarias para tomar decisiones estratégicas en el ámbito aeronáutico.",
      icon: Award
    }
  ];

  const benefits = [
    {
      title: "SkyMedik",
      benefit: "15% de Descuento",
      desc: "En tu examen médico de aptitud psicofísica. Realízalo de manera rápida y eficiente con especialistas médicos autorizados."
    },
    {
      title: "Inglés Individual",
      benefit: "50% de Descuento",
      desc: "En el curso completo de 12 meses. Domina el idioma inglés conversacional indispensable para tu carrera en aviación internacional."
    },
    {
      title: "Sindicato CTM",
      benefit: "Descuento Especial",
      desc: "Beneficios exclusivos para agremiados y familiares directos en todas nuestras carreras y cursos formativos."
    },
    {
      title: "Sindicato CROC",
      benefit: "Descuento Especial",
      desc: "Tarifas preferenciales para miembros agremiados, apoyando el crecimiento y capacitación profesional de sus integrantes."
    }
  ];

  const galleryImages = [
    { id: 1, title: "RECEPCIÓN", label: "Área de atención para alumnos y futuros alumnos.", img: fac3Img },
    { id: 2, title: "SALONES", label: "Aulas para instrucción teórica.", img: fac1Img },
    { id: 3, title: "SIMULADORES", label: "Entrenadores sintéticos de vuelo", img: fac2Img },
    { id: 4, title: "BIBLIOTECA DIGITAL", label: "Sala ejecutiva para alumnos y briefings.", img: fac4Img },
    { id: 5, title: "CABINA MOCKUP", label: "Taller para las prácticas de Sobrecargo.", img: fac6Img },
    { id: 6, title: "ENTRADA", label: "Entrada principal de nuestras instalaciones.", img: fac5Img }
  ];

  const faqs = [
    {
      q: "¿Qué carreras y cursos de aviación ofrecen en Cancún?",
      a: "En ICAAS somos especialistas en la formación de Sobrecargos de Aviación y Oficiales de Operaciones Aeronáuticas. También contamos con cursos de especialización como Sobrecargo Ejecutivo (aviación VIP), Introducción al A320 y entrenamiento en simuladores con tecnología de vanguardia."
    },
    {
      q: "¿Cuáles son los requisitos para estudiar la carrera de sobrecargo en ICAAS?",
      a: "Los requisitos básicos incluyen ser mayor de 18 años (o estar por cumplirlos), contar con bachillerato terminado y obtener el Certificado de Aptitud Psicofísica (examen médico de la AFAC). ¡Nosotros te orientamos en todo el proceso!"
    },
    {
      q: "¿Tienen convenios o beneficios para sus alumnos?",
      a: "¡Sí! Contamos con convenios exclusivos: 50% de descuento en Inglés Individual para que salgas bilingüe, y 15% de descuento en tu examen médico con SkyMedik. También tenemos beneficios especiales para agremiados de la CTM y CROC."
    },
    {
      q: "¿Dónde se encuentra ubicada la escuela de aviación?",
      a: "Estamos en el corazón de Cancún: Pabellón Bonampak (Av. Sayil), locales 205 y 206. Nuestras instalaciones están diseñadas para simular entornos reales de trabajo. ¡Ven a conocernos!"
    },
    {
      q: "¿Es necesario hablar inglés para inscribirme a la carrera?",
      a: "No es obligatorio para iniciar tu formación, pero es fundamental para trabajar en aerolíneas internacionales. Por eso, en ICAAS te facilitamos el dominio del idioma a través de nuestro convenio con Inglés Individual."
    }
  ];

  return (
    <div id={id} className="pt-28 md:pt-36 pb-20 bg-gradient-to-b from-[#0F1115] via-[#161922] to-[#0A0B0D] min-h-screen text-white relative overflow-hidden">
      
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[350px] h-[350px] bg-[#1877F2]/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Main Grid: Historia & Excelencia on Left, Ventajas on Right */}
      <div className="max-w-5xl mx-auto px-6 mb-24 relative z-10 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Nuestra Historia & Excelencia */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-start text-left p-1">
            <div className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/15 rounded-full px-4 py-1.5 w-fit mt-1.5">
              <School size={14} className="text-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Formando el Liderazgo en el Aire</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-white tracking-tighter leading-tight uppercase">
              Nuestra <span className="text-primary italic">Historia & Excelencia.</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
              Ubicada en la ciudad de Cancún, donde se encuentra unos de los principales aeropuertos internacionales del país, ICAAS nace como response a la creciente demanda de adiestramiento aeronáutico especializado que cumplan los estandares internacionales de seguridad y capacidad. Guiados por instructores con experience basta en el medio aeronáutico, no limitamos el conocimiento al pizarrón: formamos profesionales con las competencias para afrontar problemas y situaciones reales durante la operación diaria.
            </p>
          </div>

          {/* Right Column: Ventajas de Ser Alumno */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-start text-left">
            <div className="space-y-1.5 pt-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">Convenios Activos</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Ventajas al Ser Alumno</h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0.35, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#12151d]/40 rounded-3xl p-6 sm:p-7 border-2 border-white/15 hover:border-white/25 transition-all duration-300 shadow-xl space-y-4"
            >
              {benefits.map((b, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col gap-1.5 border-b border-white/5 last:border-b-0 pb-4 last:pb-0 hover:translate-x-1 transition-transform duration-250"
                >
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2 items-center">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{b.title}</h4>
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                      {b.benefit}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px] font-light leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Pilares Section (Below side-by-side grid) */}
      <div className="max-w-5xl mx-auto px-6 mb-24 relative z-10 text-left sm:text-center mt-12">
        <div className="mb-10 flex flex-col items-start sm:items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Filosofía de Trabajo</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight text-left sm:text-center">Pilares de ICAAS</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0.35, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#12151d]/40 rounded-3xl p-6 shadow-md border-2 border-white/15 hover:border-white/25 transition-all duration-300 flex flex-col items-start sm:items-center text-left sm:text-center justify-between"
              >
                <div className="flex flex-col items-start sm:items-center">
                  <div className="bg-primary/10 text-primary p-3 rounded-2xl mb-5 flex justify-center items-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide mb-3">{val.title}</h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Gallery Section */}
      <div className="max-w-5xl mx-auto px-6 mb-24 relative z-10">
        <div className="mb-10 text-center flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Seguridad Física & Práctica Real</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">Nuestras Instalaciones en Cancún</h2>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={image.id}
              onClick={() => setActiveImageIdx(idx)}
              whileHover={{ scale: 1.02 }}
              className="group relative h-60 rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 shadow-sm border border-white/5"
            >
              <img
                src={image.img}
                alt={image.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-primary font-black mb-1 block">{image.title}</span>
                <p className="text-xs font-bold leading-tight line-clamp-2">{image.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Immersive FAQ Accordion */}
      <div id="faqs" className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto text-primary size-8 mb-4 stroke-1 animate-bounce" />
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">Respuestas rápidas para programar tu inscripción con total confianza.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFAQIndex === index;
            return (
              <div 
                key={index}
                className="bg-[#12151d]/40 rounded-2xl border-2 border-white/15 overflow-hidden shadow-md transition-all duration-300 hover:border-white/25"
              >
                <button
                  onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                  className="w-full text-center p-5 sm:p-6 flex justify-between items-center bg-transparent"
                >
                  <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wide leading-tight">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="p-5 sm:p-6 bg-[#161922]/50">
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-5xl mx-auto px-6 mb-24 relative z-10">
        <div className="h-[350px] w-full relative overflow-hidden bg-neutral-900 rounded-[24px] border border-white/5 shadow-xl">
          <LazyMap 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.189569766952!2d-86.82772592534596!3d21.144863384260935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2c0628287399%3A0x6339d1b6cf0728c3!2sPabell%C3%B3n%20Bonampak!5e0!3m2!1ses-419!2smx!4v1716934523910!5m2!1ses-419!2smx"
            className="w-full h-full grayscale-[0.8] contrast-[1.2] opacity-80 border-0"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block w-full max-w-sm">
             <div className="bg-[#12151d]/95 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl text-white text-left">
                <span className="text-[10px] uppercase tracking-widest text-primary mb-2 block font-black">Nuestra Sede</span>
                <h3 className="text-2xl font-black text-white mb-4 italic">ICAAS</h3>
                <p className="text-[10px] text-gray-400 font-light leading-relaxed mb-6">Ubicados en Pabellón Bonampak, Av. Sayil, Manzana 5, Lote 2, Locales 205 y 206, Supermanzana 6, Cancún, Quintana Roo.</p>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/529987510172" className="flex items-center gap-3 text-white font-black text-[10px] tracking-widest uppercase hover:text-primary transition-colors">
                    <Phone size={16} className="text-primary" />
                    998 751 0172
                  </a>
                  <a href="https://maps.app.goo.gl/hC8aT9iViyz498NV7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white font-black text-[10px] tracking-widest uppercase hover:text-primary transition-colors">
                     <MapPin size={16} className="text-primary" />
                     Pabellón Bonampak, Cancún
                  </a>
                  <a 
                    href="https://maps.app.goo.gl/hC8aT9iViyz498NV7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-wider py-3 px-5 rounded-full shadow-lg hover:scale-105 active:scale-[0.98] transition-all duration-300 border border-white/10 text-center"
                  >
                    <MapPin size={12} className="text-white" />
                    Abrir en Google Maps
                  </a>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Dialog for Facilities */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setActiveImageIdx(null)}
            />

            {/* Carousel Item with Controls */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[85vh] z-10 rounded-[24px] overflow-hidden bg-neutral-900 border border-white/10 flex flex-col shadow-2xl"
            >
              <button
                onClick={() => setActiveImageIdx(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2.5 rounded-full border border-white/10 transition-colors z-20"
                aria-label="Cerrar vista"
              >
                ✕
              </button>

              <div className="relative flex-grow h-[60vh] flex items-center justify-center">
                <img
                  src={galleryImages[activeImageIdx].img}
                  alt={galleryImages[activeImageIdx].label}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="bg-black/80 p-5 border-t border-white/5 flex justify-between items-center text-white">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-primary font-black mb-1 block">{galleryImages[activeImageIdx].title}</span>
                  <p className="text-xs sm:text-sm font-bold">{galleryImages[activeImageIdx].label}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveImageIdx((activeImageIdx + galleryImages.length - 1) % galleryImages.length)}
                    className="bg-white/10 p-2.5 rounded-xl text-white hover:bg-primary transition-colors text-xs font-bold"
                  >
                    Ant.
                  </button>
                  <button 
                    onClick={() => setActiveImageIdx((activeImageIdx + 1) % galleryImages.length)}
                    className="bg-white/10 p-2.5 rounded-xl text-white hover:bg-primary transition-colors text-xs font-bold"
                  >
                    Sig.
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
