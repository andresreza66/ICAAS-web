import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import {   Award, Shield, Users, ArrowRight, CheckCircle2, Zap,
  HelpCircle, ChevronDown, Image, Building, School, Info, Star,
  Phone, MapPin, ChevronLeft, ChevronRight
} from 'lucide-react';
import { LazyMap } from '../components/LazyMap';

// Import local assets for building layout correctly
import fac1Img from '../assets/images/nosotros_fac1.jpg'; 
import fac2Img from '../assets/images/nosotros_fac2.png';
import fac4Img from '../assets/images/nosotros_fac4.jpg';
import fac5Img from '../assets/images/nosotros_fac5.png';
import fac6Img from '../assets/images/nosotros_fac6.jpg';

// Additional imports for areas comunes uploaded images
import acFachada from '../assets/images/nosotros_fachada_de_la_escuela.jpg';
import acRecepcion from '../assets/images/nosotros_recepcion_con_letrero.jpg';
import acPasillo from '../assets/images/regenerated_image_1783872666124.jpg';
import acOficinaAdmin from '../assets/images/nosotros_oficina_administrativa.jpg';
import acOficinaControl from '../assets/images/nosotros_oficina_de_control_escolar.jpg';
import salImg2 from '../assets/images/nosotros_sal2.png';
import salImg3 from '../assets/images/nosotros_sal3.jpg';

// Imports for digital library (biblioteca) uploaded images
import libImg1 from '../assets/images/regenerated_image_1783867891839.jpg';
import libImg2 from '../assets/images/regenerated_image_1783867893953.jpg';
import libImg3 from '../assets/images/regenerated_image_1783867895153.jpg';

// Additional thematic assets
import trainerSinteticoUpdated from '../assets/images/regenerated_image_1783868704590.jpg';
import trainerSintetico from '../assets/images/nosotros_trainer_sintetico.jpg';
import simuladorVuelo from '../assets/images/nosotros_simulador_vuelo.jpg';
import garmin1000 from '../assets/images/nosotros_garmin_1000.jpg';
import mockupCabina from '../assets/images/nosotros_mockup_cabina.jpg';
import airbusA320 from '../assets/images/nosotros_airbus_a320.jpg';

// New entrenadores images
import entrenadorImg1 from '../assets/images/regenerated_image_1783868585570.jpg';
import entrenadorImg2 from '../assets/images/regenerated_image_1783740864025.jpg';
import entrenadorImg3 from '../assets/images/regenerated_image_1783873142875.jpg';
import entrenamientoSobrecargo from '../assets/images/nosotros_entrenamiento_sobrecargo.jpg';
import logoImg from '../assets/images/regenerated_image_1777580804672_opt.png';

// New mockup images
import mockupImg3 from '../assets/images/regenerated_image_1783869290954.jpg';
import mockupImg4 from '../assets/images/regenerated_image_1783869292183.jpg';
import mockupImg5 from '../assets/images/regenerated_image_1783869293613.jpg';
import mockupImg6 from '../assets/images/regenerated_image_1783869295458.jpg';
import mockupImg7 from '../assets/images/regenerated_image_1783869297082.jpg';
import mockupImg8 from '../assets/images/regenerated_image_1783869298979.jpg';
import mockupImg9 from '../assets/images/regenerated_image_1783869300321.jpg';
import mockupImg10 from '../assets/images/regenerated_image_1783869301882.jpg';
import mockupImg11 from '../assets/images/regenerated_image_1783870120419.jpg';
import mockupImg12 from '../assets/images/regenerated_image_1783870121558.jpg';

const categories = [
  { id: 'areas-comunes', label: 'Áreas comunes', desc: 'Espacios modernos diseñados para el confort, el estudio y la convivencia de nuestros alumnos.' },
  { id: 'salones', label: 'Salones', desc: 'Aulas climatizadas y equipadas con tecnología multimedia para instrucción teórica.' },
  { id: 'biblioteca', label: 'Biblioteca digital', desc: 'Sala de consulta con acceso a briefings operacionales, manuales oficiales y computadoras.' },
  { id: 'entrenadores', label: 'Entrenadores sintéticos', desc: 'Simuladores de vuelo equipados con tecnología de vanguardia para prácticas de vuelo y despacho.' },
  { id: 'mockup', label: 'Mockup de cabina de pasajeros', desc: 'Taller especializado que recrea una cabina de pasajeros real para el adiestramiento de sobrecargos.' }
];

const categoryImages: Record<string, string[]> = {
  'areas-comunes': [
    acFachada,
    acRecepcion,
    acPasillo,
    acOficinaAdmin,
    acOficinaControl
  ],
  'salones': [
    fac1Img,
    fac6Img,
    salImg2,
    salImg3
  ],
  'biblioteca': [
    fac4Img,
    libImg1,
    libImg2,
    libImg3
  ],
  'entrenadores': [
    trainerSinteticoUpdated,
    trainerSintetico,
    simuladorVuelo,
    garmin1000,
    airbusA320,
    entrenadorImg1,
    entrenadorImg2,
    entrenadorImg3
  ],
  'mockup': [
    mockupCabina,
    entrenamientoSobrecargo,
    mockupImg3,
    mockupImg4,
    mockupImg5,
    mockupImg6,
    mockupImg7,
    mockupImg8,
    mockupImg9,
    mockupImg10,
    mockupImg11,
    mockupImg12
  ]
};

export default function Nosotros({ id }: { id: string }) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('areas-comunes');

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

  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Auto-advance carousel
  useEffect(() => {
    const currentImages = categoryImages[activeTab] || [];
    if (currentImages.length <= 1) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % currentImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Reset carousel index when changing active category tab
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeTab]);

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

      {/* Hero Header Section */}
      <section id="hero" className="relative mb-16 z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-4 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 w-fit">
          <School size={14} className="text-primary animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Escuela de Aviación ICAAS</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter leading-none mb-4 uppercase text-white">
            Nuestra <span className="text-primary">Historia & Excelencia</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Formando profesionales y líderes de la industria aeronáutica con los más altos estándares y tecnología de vanguardia en el sureste.
          </p>
        </motion.div>
      </section>

      {/* SECTION: ¿Quiénes somos? */}
      <section id="quienes-somos" className="py-12 mb-20 relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-[#12151d]/40 rounded-3xl p-8 md:p-12 border-2 border-white/10 hover:border-primary/20 hover:bg-[#12151d]/50 transition-all duration-300 shadow-2xl text-center flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-primary font-black flex items-center gap-2 mb-6">
            <span className="w-6 h-[2px] bg-primary block"></span> CONCEPTO INSTITUCIONAL <span className="w-6 h-[2px] bg-primary block"></span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter leading-tight uppercase mb-6">
            ¿Quiénes <span className="text-primary">somos?</span>
          </h2>
          <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Ubicada en la ciudad de Cancún, donde se encuentra uno de los principales aeropuertos internacionales del país, ICAAS nace como respuesta a la creciente demanda de adiestramiento aeronáutico especializado que cumpla con los estándares internacionales de seguridad y capacidad. Guiados por instructores con experiencia vasta en el medio aeronáutico, no limitamos el conocimiento al pizarrón: formamos profesionales con las competencias para afrontar problemas y situaciones reales durante la operación diaria.
          </p>
        </div>
      </section>

      {/* Center Section: Ventajas de Ser Alumno with independent side-by-side cards */}
      <div className="max-w-6xl mx-auto px-6 mb-24 relative z-10 text-left">
        <div className="space-y-1.5 mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary block">Convenios Activos</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">Ventajas al Ser Alumno</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.35, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#12151d]/40 rounded-3xl p-6 sm:p-7 border-2 border-white/10 hover:border-primary/30 hover:bg-[#12151d]/60 transition-all duration-300 shadow-xl flex flex-col items-start justify-between text-left gap-4 h-full"
            >
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/15">
                  <CheckCircle2 size={20} className="text-primary" />
                </div>
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">{b.title}</h4>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 w-fit">
                  {b.benefit}
                </span>
              </div>
              <p className="text-gray-400 text-[11px] font-light leading-relaxed mt-2">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pilares Section (Below side-by-side grid) */}
      <div className="max-w-5xl mx-auto px-6 mb-24 relative z-10 text-left mt-12">
        <div className="mb-10 flex flex-col items-start">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Filosofía de Trabajo</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight text-left">Pilares de ICAAS</h2>
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
                className="bg-[#12151d]/40 rounded-3xl p-6 shadow-md border-2 border-white/15 hover:border-white/25 transition-all duration-300 flex flex-col items-start text-left justify-between"
              >
                <div className="flex flex-col items-start">
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
          <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Instalaciones de altura</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">Nuestras Instalaciones en Cancún</h2>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          {/* Mobile Dropdown */}
          <div className="block sm:hidden">
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => {
                  setActiveTab(e.target.value);
                  setCarouselIndex(0);
                  setActiveImageIdx(null);
                }}
                className="w-full appearance-none bg-[#12151d]/80 border border-white/20 text-white text-xs font-bold uppercase tracking-widest py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-lg shadow-black/20"
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
                    ? 'bg-primary text-secondary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-[#12151d]/40 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Description */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-gray-400 text-xs sm:text-sm font-light italic leading-relaxed">
            "{categories.find(c => c.id === activeTab)?.desc}"
          </p>
        </div>

        {/* Sleek Carousel Container */}
        {(() => {
          const currentImages = categoryImages[activeTab] || [];
          const imagesWithSrc = currentImages; // Keep all spaces!

          if (imagesWithSrc.length === 0) {
            return (
              <div className="h-60 rounded-2xl bg-neutral-900/30 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                <Image size={32} className="text-gray-500 mb-3" />
                <p className="text-xs text-gray-500">Próximamente más imágenes disponibles.</p>
              </div>
            );
          }

          const currentItem = imagesWithSrc[carouselIndex] || imagesWithSrc[0];

          return (
            <div className="relative max-w-4xl mx-auto flex flex-col items-center">
              {/* Main Visual Frame - Pristine and free of any text overlay */}
              <div className="relative w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden bg-neutral-950/85 border border-white/10 shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    {currentItem && (
                      <div className="relative w-full h-full">
                        <img
                          src={currentItem}
                          alt="Instalación ICAAS Cancún"
                          className="w-full h-full object-cover cursor-zoom-in"
                          onClick={() => setActiveImageIdx(carouselIndex)}
                          referrerPolicy="no-referrer"
                        />
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary/95 text-white hover:text-secondary p-3 rounded-full border border-white/10 hover:border-transparent transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-lg z-20 flex justify-center items-center"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={20} className="stroke-[2.5]" />
                  </button>
                )}

                {/* Right Arrow Button */}
                {imagesWithSrc.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarouselIndex((carouselIndex + 1) % imagesWithSrc.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-primary/95 text-white hover:text-secondary p-3 rounded-full border border-white/10 hover:border-transparent transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-lg z-20 flex justify-center items-center"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight size={20} className="stroke-[2.5]" />
                  </button>
                )}

                {/* Tap to zoom indicator */}
                {currentItem && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white/80 text-[10px] uppercase tracking-wider font-black flex items-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <Image size={11} className="text-primary" /> Ampliar vista
                  </div>
                )}
              </div>

              {/* Outside Caption: Elegant alignment below the image, with no descriptive labels */}
              <div className="mt-5 text-center px-4 min-h-[44px]">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  Imagen {carouselIndex + 1} de {imagesWithSrc.length}
                </p>
              </div>

              {/* Interactive Thumbnail Strip navigation below */}
              {imagesWithSrc.length > 1 && (
                <div className="mt-4 flex justify-center gap-2 overflow-x-auto max-w-full py-2 px-4 scrollbar-none scroll-smooth">
                  {imagesWithSrc.map((image, idx) => {
                    const isActive = idx === carouselIndex;
                    return (
                      <div
                        key={idx}
                        className={`relative w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-300 border-2 ${
                          isActive
                            ? 'border-primary scale-105 shadow-md shadow-primary/20'
                            : 'border-white/15 opacity-80 hover:opacity-100'
                        }`}
                      >
                        {image && (
                          <div className="w-full h-full relative group/thumb">
                            <img
                              src={image}
                              alt="Miniatura"
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => setCarouselIndex(idx)}
                              referrerPolicy="no-referrer"
                            />
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
        {activeImageIdx !== null && (() => {
          const currentImages = categoryImages[activeTab] || [];
          const imagesWithSrc = currentImages; // Keep all spaces!
          const currentItem = imagesWithSrc[activeImageIdx];

          if (!currentItem) return null;

          return (
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

                <div className="relative flex-grow h-[60vh] flex items-center justify-center p-4">
                  {currentItem ? (
                    <img
                      src={currentItem}
                      alt="Instalación ICAAS Cancún Ampliada"
                      className="max-h-full max-w-full object-contain rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center text-center p-6 bg-neutral-900 border border-white/5 rounded-2xl">
                      <Image size={48} className="text-primary/40 mb-3 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-widest text-primary mb-1">Espacio Disponible</span>
                      <p className="text-gray-500 text-xs max-w-xs font-light">
                        Próximamente nueva imagen de nuestras instalaciones.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-[#12151d] p-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-white gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-black mb-1 block">
                      {categories.find(c => c.id === activeTab)?.label}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      Imagen {activeImageIdx + 1} de {imagesWithSrc.length}
                    </p>
                  </div>
                  {imagesWithSrc.length > 1 && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActiveImageIdx((activeImageIdx + imagesWithSrc.length - 1) % imagesWithSrc.length)}
                        className="bg-white/15 p-2.5 rounded-xl text-white hover:bg-primary hover:text-secondary transition-all text-xs font-black uppercase tracking-wider"
                      >
                        Ant.
                      </button>
                      <button 
                        onClick={() => setActiveImageIdx((activeImageIdx + 1) % imagesWithSrc.length)}
                        className="bg-white/15 p-2.5 rounded-xl text-white hover:bg-primary hover:text-secondary transition-all text-xs font-black uppercase tracking-wider"
                      >
                        Sig.
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
