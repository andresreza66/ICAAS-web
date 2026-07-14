import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { 
  Plane, Award, CheckCircle2, Clock, ShieldCheck, 
  Layers, Globe, Users, Check, Plus, ArrowRight, 
  GraduationCap, BookOpen, AlertTriangle, MessageSquare, ChevronDown, ChevronRight,
  Facebook, Instagram, MessageCircle, Phone, MapPin
} from 'lucide-react';
import { LazyMap } from '../components/LazyMap';

// Import images
import sobrecargoImg from '../assets/images/regenerated_image_1777628071663_opt.jpg';
import oficialImg from '../assets/images/regenerated_image_1777626580593_opt.jpg';
import sobrecargoQueEsImg from '../assets/images/sobrecargo_que_es_1779821539661.png';
import oficialQueEsImg from '../assets/images/oficial_que_es_1779821556889.png';

// Import newly generated images for the grids
import cabin1 from '../assets/images/cabin_mockup_one_1784053169390.jpg';
import cabin2 from '../assets/images/cabin_mockup_two_1784053182602.jpg';
import cabin3 from '../assets/images/cabin_mockup_three_1784053192197.jpg';
import cabin4 from '../assets/images/cabin_mockup_four_1784053201238.jpg';

import trainer1 from '../assets/images/trainer_flight_one_1784053211958.jpg';
import trainer2 from '../assets/images/trainer_flight_two_1784053221393.jpg';
import trainer3 from '../assets/images/trainer_flight_three_1784053230504.jpg';
import trainer4 from '../assets/images/trainer_flight_four_1784053241013.jpg';

interface CareerLandingProps {
  careerKey: 'sobrecargo' | 'oficial';
}

const SECTIONS = [
  { id: 'hero', label: 'Inicio', icon: Plane },
  { id: 'que-es', label: '¿Qué es?', icon: CheckCircle2 },
  { id: 'funciones-y-plan', label: 'Malla & Funciones', icon: Layers },
  { id: 'duracion-y-modalidades', label: 'Duración & Modalidades', icon: Clock },
  { id: 'perfil-y-requisitos', label: 'Perfil & Requisitos', icon: GraduationCap },
  { id: 'cta-whatsapp', label: 'Inscripción', icon: MessageSquare },
  { id: 'faq', label: 'Preguntas', icon: Globe }
];

const cinematicFadeIn = {
  initial: { opacity: 0.35, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05, margin: "-50px 0px" },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } // Highly polished custom Bezier curve for cinematic speed deceleration
};

export default function CareerLanding({ careerKey }: CareerLandingProps) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [careerKey]);

  const seoConfig = careerKey === 'sobrecargo' ? {
    title: "Sobrecargo de aviación en Cancún | ICAAS Aviación",
    description: "Estudia para Sobrecargo en ICAAS Aviación. Aprende habilidades de seguridad y servicio a bordo para trabajar en la industria aérea.",
    path: "/sobrecargo",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Sobrecargo de Aviación (Asistente de Vuelo)",
      "description": "Fórmate profesionalmente como Sobrecargo de Aviación en Cancún con altos estándares y simulador de cabina de Airbus A320.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "ICAAS Aviación",
        "sameAs": "https://vuela-icaas.com"
      },
      "educationalCredentialAwarded": "Licencia de Sobrecargo de Aviación",
      "offers": {
        "@type": "Offer",
        "category": "Education"
      }
    }
  } : {
    title: "Oficial de operaciones en Cancún | ICAAS Aviación",
    description: "Fórmate como Oficial de Operaciones en ICAAS Aviación y aprende sobre seguridad operacional y coordinación en operaciones aéreas.",
    path: "/oficial",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Oficial de Operaciones de Aeronaves (Despachador de Vuelo)",
      "description": "Capacítate en operaciones de vuelo, despacho de aeronaves, navegación comercial y meteorología aeronáutica en Cancún.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "ICAAS Aviación",
        "sameAs": "https://vuela-icaas.com"
      },
      "educationalCredentialAwarded": "Licencia de Oficial de Operaciones de Aeronaves",
      "offers": {
        "@type": "Offer",
        "category": "Education"
      }
    }
  };

  useSEO(seoConfig);

  // Track scroll position to update active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 'hero';
      let minDistance = Infinity;

      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top);
          if (dist < minDistance && rect.top <= window.innerHeight / 2) {
            minDistance = dist;
            currentSection = sec.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const careersData = {
    sobrecargo: {
      id: "sobrecargo",
      title: "Sobrecargo de Aviación",
      tagline: "El corazón de la seguridad y el servicio en el cielo",
      image: sobrecargoImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n%20de%20la%20carrera%20de%20Sobrecargo%20de%20Aviaci%C3%B3n.",
      queEs: {
        heading: "¿Qué es un Sobrecargo de Aviación?",
        text1: "El Sobrecargo de Aviación (oficialmente Tripulante de Cabina de Pasajeros o TCP) es el profesional aeronáutico encargado primordialmente de salvaguardar la seguridad de los pasajeros a bordo de una aeronave y, de manera complementaria, de asegurar su máximo confort y servicio a bordo.",
        text2: "Lejos de limitarse a la hospitalidad, el sobrecargo es un elemento técnico clave capacitado minuciosamente bajo regulaciones internacionales para gestionar la seguridad de los pasajeros a bordo de la aeronave.",
        image: sobrecargoQueEsImg
      },
      imagesGrid: {
        title: "Mockup de Cabina de Pasajeros",
        subtitle: "Entrenamiento inmersivo en cabina real",
        description: "En ICAAS contamos con un mockup de cabina de pasajeros que cuenta con 12 asientos, half galley y cumple rigurosamente con todo lo necesario para las prácticas operacionales y de seguridad que deben realizar los sobrecargos.",
        images: [
          { src: cabin1, alt: "Mockup de cabina de pasajeros Airbus A320" },
          { src: cabin2, alt: "Puerta de evacuación y galley de entrenamiento" },
          { src: cabin3, alt: "Filas de asientos y compartimentos superiores de cabina" },
          { src: cabin4, alt: "Práctica de seguridad y servicio a bordo" }
        ]
      },
      funciones: [
        {
          title: "Vigilancia de Seguridad a Bordo",
          desc: "Inspección pre-vuelo de todo el equipo de emergencia en cabina (balsas, chalecos, oxígeno, extintores) and monitoreo de puertas y salidas."
        },
        {
          title: "Evacuación y Manejo de crisis",
          desc: "Liderar la evacuación de cabina en tierra o agua en un plazo máximo de 90 segundos siguiendo estrictos procedimientos internacionales."
        },
        {
          title: "Primeros Auxilios",
          desc: "Atención inmediata para pasajeros ante emergencias físicas repentinas, incluyendo reanimación cardiopulmonar (RCP), asfixias o traumatismos."
        },
        {
          title: "Servicio a bordo",
          desc: "Brindar atención personalizada y de primer nivel internacional a una diversidad multicultural de pasajeros, garantizando la lealtad con la aerolínea."
        }
      ],
      importancia: "Son la primera y última línea de seguridad en la cabina de pasajeros. Su sólida formación y carácter asertivo garantizan el cumplimiento de las normas de aviación civil que hacen posible los vuelos y la confianza colectiva en los cielos de todo el mundo.",
      planEstudios: [
        "Introducción al medio aeronáutico",
        "Aerodinámica",
        "Meteorología",
        "Reglamentación aérea",
        "Factores humanos",
        "Transporte de mercancías peligrosas",
        "Inglés técnico aeronáutico",
        "Requerimientos técnicos",
        "Primeros auxilios",
        "Disposiciones generales y servicio a bordo",
        "Seguridad y procedimientos de emergencia"
      ],
      modalidades: [
        {
          tipo: "Modalidad Escolarizada",
          duracion: "6 Meses de adiestramiento",
          horario: "Lunes a Viernes: 9:00 AM a 1:00 PM",
          desc: "Capacitación intensiva diaria. Ideal para una rápida inserción laboral y máximo aprovechamiento práctico en laboratorios."
        },
        {
          tipo: "Modalidad Sabatina",
          duracion: "10 Meses de adiestramiento",
          horario: "Sábados de Inscripción: 8:00 AM a 4:30 PM",
          desc: "Flexible, adaptado para quienes trabajan o cursan otros estudios en Cancún de manera paralela."
        }
      ],
      requisitos: [
        "Acta de nacimiento mexicana",
        "Tener 18 años cumplidos antes de finalizar el trámite de licencia",
        "Certificado total de Bachillerato (Preparatoria) terminado",
        "Constancia de aptitud psicofísica clase 3 vigente (Examen médico aeronáutico de la AFAC)",
        "4 fotografías tamaño pasaporte fondo blanco"
      ],
      perfil: {
        ingreso: "Jóvenes con profunda vocación de servicio, empatía innata, excelentes habilidades de comunicación oral, responsabilidad ética, facilidad para el trabajo en equipos asertivos y resiliencia ante entornos con horarios flexibles y dinámicos.",
        egreso: "Dominarás las técnicas avanzadas de servicio vip y cabina clásica, sabrás resolver situaciones críticas operacionales con asertividad total (CRM), aplicarás normas internacionales vigentes de seguridad y estarás listo para obtener tu licencia federal AFAC."
      },
      faqs: [
        {
          question: "¿A partir de qué edad puedo iniciar a estudiar para Sobrecargo?",
          answer: "La edad mínima requerida para iniciar tus estudios en la carrera de Sobrecargo en ICAAS es de 18 años cumplidos, asegurando que cumples con la edad legal exigida por las aerolíneas y autoridades aeronáuticas de inmediato."
        },
        {
          question: "¿Es indispensable dominar el inglés antes de comenzar?",
          answer: "No es obligatorio el inglés para estudiar e inscribirte a la carrera. Sin embargo, para integrarte a las principales aerolíneas comerciales o de aviación privada internacional, el inglés es sumamente valorado. En ICAAS contamos con un convenio exclusivo de 50% de descuento en Inglés Individual para impulsarte."
        },
        {
          question: "¿Qué es la Constancia de Aptitud Psicofísica y dónde la tramito?",
          answer: "Es el certificado médico oficial exigido nacionalmente por la AFAC para constatar que cumples con la salud física y mental óptima requerida para laborar en vuelo comercial. Para tu facilidad, en ICAAS contamos con convenio directo y un 15% de descuento presencial en SkyMedik para agilizar tu evaluación."
        },
        {
          question: "¿Cuáles son las oportunidades de contratación en Cancún?",
          answer: "El Aeropuerto Internacional de Cancún es la principal ventana internacional de México y centro operativo del Sureste. Esto genera una demanda continua de tripulantes de cabina para aerolíneas comerciales regulares, líneas de chárter vacacional y transporte ejecutivo VIP."
        },
        {
          question: "¿Los títulos y licencias de ICAAS son válidos plenamente?",
          answer: "Por supuesto. ICAAS está autorizado legalmente como centro de formación aeronáutica por la Agencia Federal de Aviación Civil (AFAC) bajo el Permiso Oficial F-213. Al finalizar con éxito todo el programa académico, acreditarás tu constancia para obtener tu Licencia Federal de forma directa."
        }
      ]
    },
    oficial: {
      id: "oficial",
      title: "Oficial de Operaciones",
      tagline: "La precisión matemática y estrategia detrás de cada vuelo",
      image: oficialImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n%20de%20la%20carrera%20de%20Oficial%20de%20Operaciones.",
      queEs: {
        heading: "¿Qué es un Oficial de Operaciones con Capacidad RTAR?",
        text1: "El Oficial de Operaciones con Capacidad RTAR (internacionalmente conocido como Flight Dispatcher o Despachador de Vuelo) es la máxima autoridad terrestre responsable de la planificación y seguridad de los vuelos a cargo.",
        text2: "En conjunto obligatorio y coordinado con el Capitán al mando, un Oficial analiza las condiciones meteorológicas desde el punto de partida hasta el punto de llegada, traza las rutas de navegación aérea más seguras y eficientes, calcula el peso y balance preciso de la aeronave para su vuelo, determina el remanente adecuado de combustible y elabora el plan de vuelo para autorizar y liberar de forma segura cada despegue.",
        image: oficialQueEsImg
      },
      imagesGrid: {
        title: "Entrenador Sintético de Vuelo",
        subtitle: "Precisión y simulación en tierra",
        description: "Nuestro entrenador sintético de vuelo avanzado simula con total exactitud las condiciones de vuelo, meteorología compleja y fallos de sistemas. Esto permite a los futuros Oficiales de Operaciones planificar, despachar y dar seguimiento en tiempo real a operaciones bajo reglas de vuelo por instrumentos (IFR).",
        images: [
          { src: trainer1, alt: "Consola del entrenador sintético de vuelo" },
          { src: trainer2, alt: "Cabina del simulador de vuelo con instrumental digital" },
          { src: trainer3, alt: "Instrucción práctica y monitoreo de despacho" },
          { src: trainer4, alt: "Simulación de aproximación instrumental y despegue" }
        ]
      },
      funciones: [
        {
          title: "Planificación y Rutas de Navegación",
          desc: "Determinar la ruta más óptima, altitudes adecuadas de crucero y aeropuertos alternos de emergencia idóneos para cada trayecto."
        },
        {
          title: "Cálculos Críticos de Peso y Balance",
          desc: "Calcular con exactitud matemática el centro de gravedad del avión, balanceando el peso combinado de equipajes, combustible y pasajeros."
        },
        {
          title: "Monitoreo del Clima y Meteorología",
          desc: "Analizar e interpretar de inmediato radares climáticos, reportes del viento y pronósticos especiales (METAR/TAF) para prever riesgos de ruta."
        },
        {
          title: "Autorización y Despacho Operativo",
          desc: "Firmar junto al comandante el manifiesto de liberación de la aeronave, certificando que el avión cumple con cada norma nacional legal y de seguridad vigente."
        }
      ],
      importancia: "El Oficial de Operaciones es la garantía de seguridad operacional en tierra de cada aerolínea. Sin su previa planificación, cálculos matemáticos y firma de despacho, ninguna aeronave comercial del mundo podría emprender el vuelo.",
      planEstudios: [
        "Introducción al centro de capacitación",
        "Síntesis histórica de la aviación",
        "Gramática",
        "Principios de la administración",
        "Medicina de aviación",
        "Legislación aeronáutica nacional e internacional",
        "Factores humanos",
        "Características de las aeronaves y sus sistemas",
        "Aerodinámica",
        "Meteorología 1 y 2",
        "Reglamento de control de tránsito aéreo",
        "Inglés técnico aeronáutico",
        "Comunicaciones aeronáuticas 1 y 2",
        "Servicios de información aeronáutica",
        "Servicio de tránsito aéreo",
        "Navegación aérea",
        "Sistemas de navegación aérea avanzados",
        "Operaciones aeronáuticas 1 y 2",
        "Transporte de mercancías peligrosas por vía aérea",
        "Seguridad"
      ],
      modalidades: [
        {
          tipo: "Modalidad Escolarizada",
          duracion: "7 Meses de adiestramiento",
          horario: "Lunes a Viernes: 9:00 AM a 1:00 PM",
          desc: "Inmersión intensiva diaria para dominar rápidamente manuales de peso y balance aeronáuticos e interpretación de sistemas globales de meteorología."
        },
        {
          tipo: "Modalidad Sabatina",
          duracion: "10 Meses de adiestramiento",
          horario: "Sábados de Inscripción: 8:00 AM a 4:30 PM",
          desc: "Diseñada para estudiantes o trabajadores en activo que buscan capacitarse profesionalmente los fines de semana."
        }
      ],
      requisitos: [
        "Acta de nacimiento oficial",
        "Tener 18 años cumplidos al tramitar su licencia de vuelo",
        "Certificado total de educación media superior (Preparatoria) acreditado",
        "Constancia de aptitud psicofísica clase 3 vigente (Cita gestionada ante AFAC)",
        "4 fotografías tamaño pasaporte con retoque"
      ],
      perfil: {
        ingreso: "Personas con marcado interés analítico, gusto por la interpretación numérica y física matemática básica, excelente capacidad para priorizar datos complejos, toma de decisiones lógica bajo tensión operativa y claridad para radio-comunicación directa.",
        egreso: "Serás el estratega clave para calcular con precisión la logística de combustible, peso y balance de aeronaves, descifrarás cartas de clima aéreas globales y ejercerás profesionalmente en centros de despacho operacionales."
      },
      faqs: [
        {
          question: "¿Un Oficial de Operaciones realiza el mismo trabajo que un controlador aéreo?",
          answer: "No. El controlador aéreo gestiona el tráfico de las aeronaves en el espacio aéreo y pistas desde la torre. En cambio, el Oficial de Operaciones planifica la estrategia global en tierra, calcula peso, balance e insumos, y autoriza el despegue de la flota propia de una aerolínea específica."
        },
        {
          question: "¿Hay buenas alternativas de trabajo en Cancún para despachadores?",
          answer: "Cancún es uno de los aeropuertos con mayor interconexión internacional del hemisferio. Operadoras aéreas mundiales, líneas aéreas regulares de pasajeros, charters vacacionales y vuelos de carga operan las 24 horas y demandan un abanico continuo de despachadores calificados de rampa e instalaciones."
        },
        {
          question: "¿ICAAS cuenta con prácticas reales para Oficial de Operaciones?",
          answer: "Sí. Completas 200 horas de prácticas reales con una empresa de servicios en rampa (handler), donde obtendrás experiencia de trabajo real directamente en el entorno operacional de un Oficial de Operaciones con Capacidad RTAR."
        },
        {
          question: "¿Qué licencia oficial obtengo al concluir?",
          answer: "Una vez completado con éxito todo tu programa teórico, laboratorios y prácticas requeridas, ICAAS emite tu constancia formal oficial para tramitar tu 'Licencia Federal de Oficial de Operaciones con Capacidad RTAR' ante la AFAC."
        },
        {
          question: "¿Cuáles son las ventajas de los convenios de la escuela?",
          answer: "ICAAS te facilita el examen médico obligatorio de la AFAC con un 15% de descuento a través de SkyMedik, además de un descuento de hasta el 50% con Inglés Individual en su curso de inglés conversacional para dominar la fluidez necesaria en el sector."
        }
      ]
    }
  };

  const activeCareer = careersData[careerKey];

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-gradient-to-b from-[#0F1115] via-[#161922] to-[#0A0B0D] min-h-screen text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-[#1877F2]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION: Title and tagline only (Images removed) */}
      <section id="hero" className="relative mb-16 z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-4 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 w-fit">
          <Plane size={14} className="animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Carrera Profesional Oficial</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter leading-none mb-4 uppercase text-white">
            {activeCareer.title}
          </h1>
          <p className="text-gray-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            {activeCareer.tagline}
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: Qué es un Sobrecargo / Oficial de Operaciones */}
      <section id="que-es" className="py-16 bg-transparent border-b border-white/5 scroll-mt-20 relative z-10 text-left">
        <motion.div {...cinematicFadeIn} className="max-w-5xl mx-auto px-6">
          
          {/* Top Part: Concepto with text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content (cuadrada a la izquierda) */}
            <div className="lg:col-span-7 space-y-6 flex flex-col items-start justify-center text-left">
              <span className="text-[10px] uppercase tracking-widest text-primary font-black flex justify-start items-center gap-2">
                <span className="w-6 h-[2px] bg-primary block"></span> CONCEPTO PROFESIONAL
              </span>
              <h2 className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter leading-tight text-left">
                {activeCareer.queEs.heading}
              </h2>
              <div className="space-y-4 text-gray-300 font-light text-base leading-relaxed text-left">
                <p>{activeCareer.queEs.text1}</p>
                <p>{activeCareer.queEs.text2}</p>
              </div>
              
              <div className="pt-6 border-t border-white/5 w-full text-left">
                <p className="text-xs font-medium text-gray-400 italic leading-relaxed">
                  {activeCareer.importancia}
                </p>
              </div>
            </div>

            {/* Right Column: Custom Aspect-Filtered Image */}
            <div className="lg:col-span-5 w-full relative">
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-xl group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img
                  src={activeCareer.queEs.image}
                  alt={activeCareer.title}
                  className="w-full h-auto object-cover rounded-[32px] aspect-4/3 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </section>



      {/* SECTION 3: Funciones Clave (Izquierda) & Plan de Estudios (Derecha) */}
      <section id="funciones-y-plan" className="py-16 bg-transparent border-b border-white/5 scroll-mt-20 relative z-10 text-left">
        <motion.div {...cinematicFadeIn} className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Funciones Clave */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-black block">ACTIVIDADES TÉCNICAS</span>
                <h3 className="text-2xl sm:text-4xl font-black italic text-white tracking-tighter">
                  Funciones Clave de la Profesión
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                  Durante el adiestramiento académico en ICAAS, dominarás paso a paso las competencias esenciales requeridas por las aerolíneas internacionales:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {activeCareer.funciones.map((func, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0.35, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className="bg-[#12151d]/40 rounded-2xl border-2 border-white/15 p-5 flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-md min-h-[140px]"
                  >
                    <div>
                      <h4 className="text-sm font-black text-white mb-2 italic">{func.title}</h4>
                      <p className="text-gray-400 font-light text-[11px] leading-relaxed">{func.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Plan de Estudios */}
            <div id="plan-estudios" className="lg:col-span-6 bg-[#12151d]/40 rounded-[32px] border-2 border-white/15 p-6 sm:p-8 space-y-6 shadow-xl scroll-mt-20 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black block">MALLA FORMATIVA VIGENTE</span>
                <h3 className="text-2xl sm:text-4xl font-black italic text-white tracking-tighter">
                  Plan de Estudios
                </h3>
                <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed">
                  Plan homologado y avalado bajo las normativas estrictas de la <strong className="font-extrabold text-primary">AFAC</strong>, estructurado para darte habilidades precisas listas para ejercer de inmediato:
                </p>
              </div>

              <div className="bg-[#161a25]/50 p-4 sm:p-6 rounded-2xl border border-white/10 shadow-md">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto custom-scrollbar pr-1.5">
                  {activeCareer.planEstudios.map((materia, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0.35, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.4), ease: "easeOut" }}
                      className="bg-[#12151d]/60 p-2.5 rounded-xl border border-white/5 flex gap-2.5 items-center hover:shadow-sm transition-shadow"
                    >
                      <span className="text-primary italic font-black text-xs shrink-0">/ {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                      <span className="text-[11px] font-bold text-white tracking-tight leading-tight">{materia}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* SECTION 4: Duración & Modalidades */}
      <section id="duracion-y-modalidades" className="py-16 bg-transparent border-b border-white/5 scroll-mt-20 relative z-10 text-center">
        <motion.div {...cinematicFadeIn} className="max-w-5xl mx-auto px-6">
          <div className="bg-[#12151d]/40 rounded-[32px] border-2 border-white/15 p-8 sm:p-12 space-y-8 flex flex-col items-center shadow-xl">
            <div className="max-w-3xl flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-black block mb-2">LOGÍSTICA ACADÉMICA</span>
              <h2 className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter mb-4">
                Duración & Modalidades
              </h2>
              <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed">
                Elige el esquema de capacitación académica que se amolde de forma armoniosa a tu ritmo de trabajo o actividades cotidianas personales:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {activeCareer.modalidades.map((mod, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0.35, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="bg-[#161a25]/55 rounded-2xl border-2 border-white/15 p-6 flex flex-col items-center text-center justify-between hover:border-white/30 transition-all duration-300 shadow-md"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
                      <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">{mod.tipo}</span>
                      <div className="flex items-center gap-1.5 text-white text-xs font-black">
                        <Clock size={14} className="text-primary" />
                        {mod.duracion}
                      </div>
                    </div>
                    <p className="text-gray-400 font-light text-xs leading-relaxed mb-4">{mod.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 w-full flex justify-center">
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-extrabold flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-primary" /> Acreditación oficial AFAC
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: Perfil del Alumno & Requisitos */}
      <section id="perfil-y-requisitos" className="py-16 bg-transparent border-b border-white/5 scroll-mt-20 relative z-10 text-left">
        <motion.div {...cinematicFadeIn} className="max-w-5xl mx-auto px-6 space-y-10">
          
          <div className="text-left flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-black block mb-2">IDENTIDAD ACADÉMICA & INGRESO</span>
            <h3 className="text-2xl sm:text-4xl font-black italic text-white tracking-tighter text-left">
              Perfil de Alumno & Requisitos
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-light mt-2 leading-relaxed max-w-3xl text-left">
              Analiza las cualidades formativas idóneas de ingreso, las destrezas de egreso y los requisitos de ingreso necesarios para ser admitido oficialmente en ICAAS:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4 w-full">
            
            {/* Column 1: Perfiles de Ingreso & Egreso stacked */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Perfil de Ingreso Card */}
              <motion.div 
                initial={{ opacity: 0.35, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="bg-[#12151d]/40 rounded-[24px] border-2 border-white/15 p-8 flex-1 flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-md text-left"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">PERFIL DE INGRESO</span>
                    <div className="text-primary w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users size={16} />
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-white italic mb-3">¿Cuáles son las cualidades idóneas para ingresar?</h4>
                  <p className="text-gray-300 font-light text-xs sm:text-sm leading-relaxed mb-4">{activeCareer.perfil.ingreso}</p>
                </div>
                <div className="pt-4 border-t border-white/5 text-left">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold block">Ideal para jóvenes con vocación en Cancún</span>
                </div>
              </motion.div>

              {/* Perfil de Egreso Card */}
              <motion.div 
                initial={{ opacity: 0.35, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="bg-[#12151d]/40 rounded-[24px] border-2 border-white/15 p-8 flex-1 flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-md text-left"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">PERFIL DE EGRESO</span>
                    <div className="text-primary w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCap size={16} />
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-white italic mb-3">¿Qué competencias profesionales dominarás al egresar?</h4>
                  <p className="text-gray-300 font-light text-xs sm:text-sm leading-relaxed mb-4">{activeCareer.perfil.egreso}</p>
                </div>
                <div className="pt-4 border-t border-white/5 text-left">
                  <span className="text-[9px] uppercase tracking-wider text-primary font-extrabold block">Listo para comenzar a ejercer con éxito en el ámbito laboral</span>
                </div>
              </motion.div>

            </div>

            {/* Column 2: Requisitos de Inscripción inside a gorgeous dark card / box (recuadro) */}
            <motion.div 
              id="requisitos" 
              initial={{ opacity: 0.35, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="lg:col-span-5 bg-[#12151d]/85 text-white rounded-[32px] p-8 flex flex-col justify-between hover:shadow-xl border border-white/10 transition-all duration-350 shadow-md scroll-mt-20 text-left"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="bg-primary/20 text-primary text-[9px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-primary/25">REQUISITOS ADMISIÓN</span>
                  <div className="text-primary w-8 h-8 rounded-lg bg-primary/25 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-black italic tracking-tight mb-2 text-[#ee3e3a]">Expediente Escolar Requerido</h4>
                  <p className="text-gray-300 text-xs font-light leading-relaxed">
                    Para iniciar tu proceso de alta formal de matrícula regulada por el gobierno federal en ICAAS, es obligatorio conformar el siguiente expediente:
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {activeCareer.requisitos.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-left">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white shrink-0 mt-0.5">
                        <Check size={10} className="stroke-[3]" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-100 leading-snug">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 bg-white/5 -mx-8 -mb-8 p-6 rounded-b-[32px] flex gap-3 text-gray-200 text-left">
                <AlertTriangle className="size-5 shrink-0 text-primary animate-pulse" />
                <p className="text-[10px] leading-relaxed font-semibold">
                  <span className="text-primary font-black uppercase tracking-wider block mb-0.5">Beneficio ICAAS</span>
                  Recuerda tramitar tu Constancia Psicofísica clase 3. Obtén hasta un 15% de descuento directo en SkyMedik.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 4-Image Grid: Mockup de Cabina / Entrenador Sintético */}
      <section id="infraestructura" className="py-16 bg-[#12151d]/10 border-b border-white/5 scroll-mt-20 relative z-10 text-left">
        <motion.div {...cinematicFadeIn} className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-black block">INFRAESTRUCTURA DE ADIESTRAMIENTO</span>
              <h2 className="text-2xl sm:text-4xl font-black italic text-white tracking-tighter">
                {activeCareer.imagesGrid.title}
              </h2>
              <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed">
                {activeCareer.imagesGrid.description}
              </p>
            </div>
            <div className="text-xs font-bold text-primary italic border border-primary/20 rounded-full px-4 py-1.5 bg-primary/10 w-fit shrink-0">
              {activeCareer.imagesGrid.subtitle}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {activeCareer.imagesGrid.images.map((img: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.35, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxIndex(idx)}
                className="aspect-square sm:aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-lg bg-[#12151d]/40 hover:border-white/25 transition-all duration-350"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: CTA a Whatsapp (Inscripciones directas) */}
      <section id="cta-whatsapp" className="py-16 bg-[#12151d]/25 border-b border-white/5 text-center relative overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-transparent z-0 pointer-events-none" />
        <motion.div {...cinematicFadeIn} className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-[10px] text-primary tracking-[0.3em] font-black uppercase mb-4 block">
            ¡DESPEGA YA EN TU ADIESTRAMIENTO!
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter mb-6">
            Inicia tu Inscripción de Forma Rápida
          </h2>
          <p className="text-gray-300 font-light text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            ¿Quieres solicitar información personalizada o agendar tu cita directa en nuestras instalaciones de Cancún? Chatea hoy mismo en WhatsApp y un asesor aeronáutico de ICAAS resolverá tus dudas e iniciará tu matrícula.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={activeCareer.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#20ba59] transition-all shadow-xl hover:scale-105 duration-300"
            >
              <MessageSquare size={18} fill="currentColor" />
              Quiero más información
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 9: FAQ específica */}
      <section id="faq" className="py-16 bg-transparent scroll-mt-20 relative z-10">
        <motion.div {...cinematicFadeIn} className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-black block mb-2">RESOLVIENDO TUS PREGUNTAS</span>
            <h2 className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light mt-3 leading-relaxed">
              Encuentra respuestas inmediatas a las dudas recurrentes sobre la formación oficial de {activeCareer.title}:
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {activeCareer.faqs.map((faq, index) => (
              <CareerFAQItem 
                key={index} 
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onToggle={() => { setOpenFAQIndex(openFAQIndex === index ? null : index); }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-transparent relative z-10">
        <motion.div {...cinematicFadeIn} className="max-w-5xl mx-auto px-6">
          <div className="h-[350px] w-full relative overflow-hidden bg-[#12151d]/40 rounded-[28px] border border-white/5 shadow-xl">
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
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 p-4 text-white hover:text-primary z-50"
              onClick={() => setLightboxIndex(null)}
            >
              <span className="text-2xl font-black">✕</span>
            </button>
            <button
              className="absolute left-6 p-4 text-white hover:text-primary z-50"
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex((lightboxIndex - 1 + activeCareer.imagesGrid.images.length) % activeCareer.imagesGrid.images.length); 
              }}
            >
              <ChevronRight className="rotate-180 size-12" />
            </button>
            <button
              className="absolute right-6 p-4 text-white hover:text-primary z-50"
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex((lightboxIndex + 1) % activeCareer.imagesGrid.images.length); 
              }}
            >
              <ChevronRight className="size-12" />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={activeCareer.imagesGrid.images[lightboxIndex].src}
              alt={activeCareer.imagesGrid.images[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Single-purpose FAQ visual item
interface CareerFAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const CareerFAQItem: React.FC<CareerFAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`transition-all duration-300 rounded-2xl p-5 ${isOpen ? 'bg-[#161a25] text-white shadow-lg border border-white/10' : 'bg-[#12151d]/40 border border-white/5 hover:border-primary/20 hover:shadow-md'}`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-start text-center gap-3 group"
      >
        <span className={`text-sm sm:text-base font-black leading-snug transition-colors ${isOpen ? 'text-white' : 'text-white/90 group-hover:text-primary'}`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`flex-shrink-0 size-6 rounded-full border flex items-center justify-center transition-colors mt-0.5 ${
            isOpen ? 'bg-primary border-primary text-white' : 'border-white/10 text-gray-400 group-hover:border-primary group-hover:text-primary'
          }`}
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`pt-4 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line ${isOpen ? 'text-gray-300' : 'text-gray-450'}`}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
