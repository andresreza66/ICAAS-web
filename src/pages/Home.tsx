import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Plane, ShieldCheck, Users, Clock, 
  CheckCircle2, Award, Briefcase, GraduationCap,
  Layers, Star, Zap, Eye, Target, Sparkles, MapPin, Info,
  Check, Mail, Phone, Send, Instagram, Facebook, MessageCircle, X, ChevronLeft, ChevronRight, Plus,
  Building2, Languages, Stethoscope, Users2
} from 'lucide-react';
// Import images from assets to allow Vite to bundle them correctly
import heroImg from '../assets/images/regenerated_image_1777628071663_opt.jpg';
import a320Img from '../assets/images/regenerated_image_1777733588143_opt.jpg';
import ejecutivoImg from '../assets/images/regenerated_image_1777628075067_opt.jpg';
import genericImg from '../assets/images/regenerated_image_1777580804672_opt.png';
import sobrecargoImg from '../assets/images/regenerated_image_1777628071663_opt.jpg';
import oficialImg from '../assets/images/regenerated_image_1777626580593_opt.jpg';
import simuladorVRImg from '../assets/images/regenerated_image_1777904006862.jpg';
import horaSimuladorImg from '../assets/images/regenerated_image_1777927339271.png';
import fac1Img from '../assets/images/regenerated_image_1777904478940.jpg'; 
import fac2Img from '../assets/images/regenerated_image_1777925795640.png';
import fac3Img from '../assets/images/regenerated_image_1777925799329.jpg';
import fac4Img from '../assets/images/regenerated_image_1777628082337_opt.jpg';
import fac5Img from '../assets/images/regenerated_image_1777628083463_opt.jpg';
import fac6Img from '../assets/images/regenerated_image_1777733645280_opt.jpg';
import fac7Img from '../assets/images/regenerated_image_1777586277135_opt.png';

export default function Home({ id }: { id: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const correo = formData.get('correo') as string;
    const celular = formData.get('celular') as string;
    const curso = formData.get('curso') as string;
    const mensaje = formData.get('mensaje') as string;
    
    try {
      // 1. Save to Google Sheets (if configured)
      const sheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      console.log("Intentando enviar a Google Sheets...", sheetUrl ? "URL Detectada" : "URL NO DETECTADA");
      
      if (sheetUrl) {
        const urlParams = new URLSearchParams();
        urlParams.append('nombre', nombre);
        urlParams.append('correo', correo);
        urlParams.append('celular', celular);
        urlParams.append('curso', curso);
        urlParams.append('mensaje', mensaje || "");
        urlParams.append('fecha', new Date().toLocaleString());

        try {
          // Usamos mode: 'no-cors' para evitar errores de seguridad del navegador
          await fetch(sheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlParams.toString()
          });
          console.log("Petición enviada correctamente (modo simple)");
        } catch (fetchError) {
          console.error("Error crítico en fetch:", fetchError);
        }
      } else {
        console.warn("VITE_GOOGLE_SHEETS_URL no está configurada en este entorno.");
        // Fallback para pruebas
        console.log("Simulación de envío:", { nombre, correo, celular, curso, mensaje });
      }
      
      setSubmitSuccess(true);
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error en el envío:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const specializedCourses = [
    {
      id: "a320",
      title: "Introducción al A320",
      tagline: "Airbus Series",
      description: "Curso introductorio a la filosofía Airbus y a los sistemas y procedimientos del A320.",
      puntosImportantes: [
        "Formación integral basada en el estándar APS MCC, alineada a operaciones reales de aerolínea",
        "Enfoque en desarrollo de competencias técnicas y no técnicas (CRM)",
        "Introducción a la filosofía Airbus, orientada a la automatización y seguridad operacional",
        "Comprensión de los principales sistemas del A320 y su lógica de funcionamiento",
        "Entrenamiento en el uso del FMS, autopilot y autothrust",
        "Interpretación y gestión de modos de vuelo mediante el FMA",
        "Aplicación de SOPs (Procedimientos Operativos Estándar) en entorno multicrew",
        "Desarrollo de habilidades de comunicación, liderazgo y toma de decisiones en cabina",
        "Preparación estructurada para sesiones en simulador de vuelo"
      ],
      planEstudios: [
        "Concepto APS MCC",
        "Filosofía Airbus",
        "Sistemas del A320",
        "Automatización y gestión de vuelo",
        "Procedimientos de operación (SOPs)",
        "Preparación para simulador"
      ],
      entrenamiento: "Introducción y SOPs básicos, Automatización básica, Perfil de vuelo completo, Escenarios complejos, Line Oriented Flight Training",
      duracion: "24 Hrs. Teoría / 20 Hrs. Simulador",
      paquetes: [],
      image: a320Img,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20curso%20de%20Introducci%C3%B3n%20al%20A320."
    },
    {
      id: "ejecutivo",
      title: "Sobrecargo Ejecutivo",
      tagline: "Curso VIP",
      description: "Especialización para sobrecargos que desean ingresar al mundo de la aviación privada de lujo. Aprende los protocolos más exigentes de servicio VIP y atención a pasajeros de alto perfil.",
      puntosImportantes: [
        "Protocolo y Etiqueta Internacional",
        "Seguridad en aviación corporativa",
        "Discreción y servicio personalizado"
      ],
      planEstudios: [
        "Diferencias de la aviación comercial y la aviación ejecutiva",
        "Conocimiento de los equipos a bordo",
        "Presentación y etiqueta del Sobrecargo ejecutivo",
        "Gestión y manejo de catering",
        "Atención y manejo de clientes VIP",
        "Protocolo, manejo y cuidados del servicio de catering",
        "Servicio y manejo de Maridajes",
        "Conocimiento Básico de etiqueta y servicio del Vino"
      ],
      nota: "Para tomar este curso no es requisito indispensable contar con la licencia de Sobrecargo de aviación (puedes tomarlo por conocimiento general o gusto personal); sin embargo, ten en cuenta que para ejercer profesionalmente como Sobrecargo Ejecutivo en una aerolínea o empresa privada, sí te será requerida la licencia oficial.",
      entrenamiento: "Prácticas reales de montaje de cabina VIP y simulación de servicio de primera clase.",
      duracion: "8 horas en dos días",
      paquetes: [],
      image: ejecutivoImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20curso%20de%20Sobrecargo%20Ejecutivo."
    },
    {
      id: "crm",
      title: "CRM",
      tagline: "Resource Mgmt",
      description: "El programa de Crew Resource Management (CRM) está diseñado para desarrollar en el alumno las habilidades no técnicas esenciales para la operación segura y eficiente de aeronaves, enfocándose en la comunicación efectiva, el liderazgo, la toma de decisiones, el trabajo en equipo, la conciencia situacional y la gestión de la carga de trabajo. A través de un enfoque basado en competencias, el curso combina teoría, análisis de casos reales, ejercicios prácticos y simulaciones que permiten al estudiante aplicar estrategias de coordinación y gestión de recursos en entornos normales, anormales y de emergencia, contribuyendo a la prevención de errores humanos y al fortalecimiento de la seguridad operacional.",
      puntosImportantes: [
        "Aplicar técnicas efectivas de comunicación y coordinación en operaciones aéreas.",
        "Gestionar la carga de trabajo y priorizar tareas en entornos dinámicos.",
        "Demostrar liderazgo y habilidades de trabajo en equipo en condiciones normales y de alta presión.",
        "Mantener conciencia situacional para anticipar y mitigar riesgos operacionales.",
        "Identificar y corregir errores humanos antes de que comprometan la seguridad.",
        "Utilizar herramientas de toma de decisiones para seleccionar la mejor acción disponible en situaciones críticas.",
        "Integrrar el CRM como parte de la cultura de seguridad operacional de la organización."
      ],
      planEstudios: [],
      entrenamiento: "",
      duracion: "8 Hrs.",
      paquetes: [],
      image: genericImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20los%20cursos%20peri%C3%B3dicos."
    },
    {
      id: "cfit",
      title: "CFIT",
      tagline: "Controlled Flight",
      description: "El programa de Controlled Flight Into Terrain (CFIT) está diseñado para proporcionar al alumno el conocimiento, las habilidades y las actitudes necesarias para prevenir incidentes y accidentes en los que una aeronave, en pleno control y con funcionamiento normal, impacta contra el terreno, agua u obstáculo. El curso combina teoría, análisis de casos reales, estudio de procedimientos operacionales y prácticas en simulador para que el estudiante identifique factores contribuyentes, aplique técnicas de prevención y utilice correctamente los sistemas de alerta y evasión, reforzando la seguridad operacional mediante la conciencia situacional y la toma de decisiones acertadas.",
      puntosImportantes: [
        "Reconocer las causas y factores contribuyentes a accidentes tipo CFIT.",
        "Aplicar procedimientos operacionales para prevenir el impacto controlado contra el terreno.",
        "Interpretar y reaccionar adecuadamente ante alertas TAWS/GPWS.",
        "Mantener conciencia situacional en todas las fases del vuelo, especialmente en entornos de baja visibilidad o terreno elevado.",
        "Analizar y utilizar cartas aeronáuticas y bases de datos de navegación para evitar zonas de riesgo.",
        "Coordinar y comunicar eficazmente con la tripulación para la toma de decisiones preventivas.",
        "Integrar la prevención de CFIT dentro de los programas de seguridad operacional de la organización."
      ],
      planEstudios: [],
      entrenamiento: "",
      duracion: "8 Hrs.",
      paquetes: [],
      image: genericImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20los%20cursos%20peri%C3%B3dicos."
    },
    {
      id: "alar",
      title: "ALAR",
      tagline: "Approach/Landing",
      description: "El programa de Approach and Landing Accident Reduction (ALAR) tiene como propósito capacitar al alumno en la identificación, prevención y mitigación de riesgos asociados a las fases críticas de aproximación y aterrizaje, a través del dominio de procedimientos operacionales, la correcta aplicación de criterios de aproximación estabilizada y la ejecución de maniobras de frustrada cuando sea necesario. El curso integra fundamentos teóricos, análisis de casos reales, uso de ayudas a la navegación y ejercicios prácticos en simulador, con un enfoque basado en competencias que fomenta la toma de decisiones seguras.",
      puntosImportantes: [
        "Identificar factores de riesgo y causas frecuentes de incidentes y accidentes en aproximación y aterrizaje.",
        "Aplicar criterios y procedimientos de aproximación estabilizada.",
        "Ejecutar maniobras de aproximación frustrada de acuerdo con procedimientos publicados.",
        "Utilizar correctamente ayudas a la navegación y sistemas de alerta TAWS/GPWS.",
        "Mantener conciencia situacional en entornos operativos cambiantes.",
        "Coordinar de manera efectiva con la tripulación aplicando principios de CRM.",
        "Integrar la prevención ALAR en la cultura de seguridad operacional de la organización."
      ],
      planEstudios: [],
      entrenamiento: "",
      duracion: "8 Hrs.",
      paquetes: [],
      image: genericImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20los%20cursos%20peri%C3%B3dicos."
    },
    {
      id: "hora-de-simulador",
      title: "Hora de Simulador",
      tagline: "Entrenamiento",
      description: "Vive la experiencia de pilotar un avión real en nuestro simulador de vuelo. Durante una hora, despegarás, volarás y aterrizarás como un verdadero piloto, con escenarios reales y acompañamiento profesional. Una experiencia intensa, inmersiva y simplemente inolvidable.",
      puntosImportantes: [],
      planEstudios: [],
      entrenamiento: "",
      duracion: "Variable",
      paquetes: [
        { label: "1 hora", price: "$1,200 p/hora" },
        { label: "5 horas", price: "$1,000 p/hora" },
        { label: "A partir de la 6ta hora", price: "$900 p/hora" }
      ],
      image: horaSimuladorImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20los%20paquetes%20de%20horas%20de%20simulador."
    },
    {
      id: "simulador-vr",
      title: "Simulador VR",
      tagline: "Next Gen",
      description: "Sumérgete en el futuro del vuelo con nuestro simulador de realidad virtual. Vive una experiencia 360° donde cada movimiento se siente real: despega, maniobra y aterriza dentro de una cabina totalmente inmersiva. No lo ves… lo vives.",
      puntosImportantes: [],
      planEstudios: [],
      entrenamiento: "",
      duracion: "Variable",
      paquetes: [
        { label: "1 hora", price: "$1,400 p/hora" },
        { label: "5 horas", price: "$1,200 p/hora" },
        { label: "A partir de la 6ta hora", price: "$1,000 p/hora" }
      ],
      image: simuladorVRImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20los%20paquetes%20de%20horas%20de%20simulador."
    }
  ];

  const careers = [
    {
      id: "sobrecargo",
      title: "Sobrecargo de Aviación",
      shortDesc: "El rostro de la aerolínea en el cielo. Formación integral en seguridad y servicio.",
      description: "La carrera de Sobrecargo de Aviación te prepara para brindar seguridad y servicio de alto nivel a bordo de aeronaves, combinando habilidades de atención al cliente, manejo de emergencias y trabajo en equipo. Es una profesión dinámica, internacional y llena de oportunidades para quienes buscan desarrollarse en la industria aérea.",
      perfil: "Persona con vocación de servicio, interés en el ámbito aeronáutico y disposición para trabajar en entornos dinámicos, multiculturales y de alta responsabilidad. Habilidades comunicativas, capacidad de trabajar bajo presión y un fuerte sentido de disciplina y compromiso.",
      planEstudios: [
        "Introducción al medio aeronáutico",
        "Aerodinámica",
        "Meteorología",
        "Reglamentación aérea",
        "Transporte de mercancías peligrosas",
        "Requerimientos técnicos",
        "Seguridad y procedimientos de emergencia",
        "Primeros auxilios",
        "Disposiciones generales y servicios a bordo",
        "Factores humanos",
        "Inglés técnico aeronáutico"
      ],
      entrenamiento: "Primeros auxilios, Servicios a bordo y Procedimientos de emergencia.",
      requisitos: [
        "Acta de nacimiento (18+)",
        "Certificado de bachillerato / preparatoria",
        "4 fotografías tamaño pasaporte",
        "Constancia de aptitud psicofísica clase 3"
      ],
      duration: "Escolarizado (L-V) 6 meses / Sabatino 10 meses",
      image: sobrecargoImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n%20de%20la%20carrera%20de%20Sobrecargo%20de%20Aviaci%C3%B3n."
    },
    {
      id: "oficial",
      title: "Oficial de Operaciones",
      shortDesc: "La precisión detrás de cada despegue. El cerebro de la operación aérea.",
      description: "La carrera de Oficial de Operaciones te forma para ser el cerebro detrás de cada vuelo, planificando rutas, analizando condiciones y garantizando operaciones seguras y eficientes. Es una profesión clave en la aviación, ideal para quienes buscan responsabilidad y toma de decisiones.",
      perfil: "Disposición para el trabajo en entornos dinámicos y bajo presión. Habilidades básicas de comunicación oral y escrita en español, capacidad de análisis y razonamiento lógico-matemático.",
      planEstudios: [
        "Introducción al centro de capacitación",
        "Gramática",
        "Principios de la administración",
        "Síntesis histórica de la aviación",
        "Características de las aeronaves y sus sistemas",
        "Legislación aeronáutica nacional e internacional",
        "Medicina de aviación",
        "Factores humanos",
        "Aerodinámica",
        "Inglés técnico aeronáutico",
        "Reglamento de control de tránsito aéreo",
        "Comunicaciones aeronáuticas I y II",
        "Servicios de información aeronáutica",
        "Meteorología I y II",
        "Navegación aérea y Operaciones I y II",
        "Transporte de mercancías peligrosas",
        "Sistemas de navegación aérea avanzada",
        "Seguridad"
      ],
      entrenamiento: "05 Hrs. en entrenador sintético IFR, 200 Hrs. de laboratorio de operaciones y 240 Hrs. en oficina de despacho.",
      requisitos: [
        "Acta de nacimiento (18+)",
        "Certificado de bachillerato / preparatoria",
        "4 fotografías tamaño pasaporte",
        "Constancia de aptitud psicofísica clase 3"
      ],
      duration: "Escolarizado (L-V) 7 meses / Sabatino 10 meses",
      image: oficialImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n%20de%20la%20carrera%20de%20Oficial%20de%20Operaciones."
    }
  ];

  const [selectedCareer, setSelectedCareer] = React.useState<null | typeof careers[0]>(null);
  const [selectedCourse, setSelectedCourse] = React.useState<null | typeof specializedCourses[0]>(null);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [openFAQIndex, setOpenFAQIndex] = React.useState<number | null>(null);

  const facilitiesImages = [
    { src: fac1Img, alt: "Simulador de Vuelo" },
    { src: fac2Img, alt: "Aulas Modernas" },
    { src: fac3Img, alt: "Entorno Aeronáutico" },
    { src: fac4Img, alt: "Biblioteca" },
    { src: fac5Img, alt: "Mantenimiento" },
    { src: fac6Img, alt: "Instalación adicional 1" },
    { src: fac7Img, alt: "Instalación adicional 2" },
  ];

  return (
    <div id={id} className="overflow-hidden">
      {/* Career Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCareer(null)}
              className="absolute inset-0 bg-secondary/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden max-h-[92vh] md:max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedCareer(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 size-10 md:size-12 bg-neutral/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all font-black shadow-lg"
              >
                ✕
              </button>
              
              <div className="flex-grow overflow-y-auto overscroll-contain">
                <div className="grid grid-cols-1 lg:grid-cols-5 h-auto">
                  <div className="lg:col-span-2 relative min-h-[250px] md:min-h-[300px]">
                    <img 
                      src={selectedCareer.image} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      fetchPriority="high"
                      decoding="sync"
                    />
                    <div className="absolute inset-0 bg-secondary/10" />
                  </div>
                  <div className="lg:col-span-3 p-10 md:p-16 pb-0 md:pb-0">
                    <span className="tag-label text-primary mb-4 block">Ficha Técnica de Carrera</span>
                    <h2 className="text-4xl md:text-5xl mb-8 leading-none">{selectedCareer.title}</h2>
                    
                    <div className="space-y-10 pb-10">
                      <section>
                        <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Descripción
                        </h4>
                        <p className="text-gray-500 font-light leading-relaxed mb-6">{selectedCareer.description}</p>
                        <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Perfil del Aspirante
                        </h4>
                        <p className="text-gray-500 font-light leading-relaxed">{selectedCareer.perfil}</p>
                      </section>

                      <section className="space-y-10 items-start">
                         <div className="bg-neutral p-8 rounded-3xl border border-gray-100">
                            <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-5 text-primary italic flex items-center gap-2">
                               <Layers size={14} /> Plan de Estudios
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                               {selectedCareer.planEstudios.map((item, idx) => (
                                 <li key={idx} className="text-[10px] sm:text-xs font-bold text-secondary flex gap-2 leading-tight items-start">
                                    <span className="text-primary italic">/</span> {item}
                                 </li>
                               ))}
                            </ul>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-3">Entrenamiento Práctico</h4>
                              <p className="text-gray-500 text-xs font-light leading-relaxed">{selectedCareer.entrenamiento}</p>
                            </div>
                            <div>
                              <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-4 text-primary italic flex items-center gap-2">
                                 <ShieldCheck size={14} /> Requisitos de Ingreso
                              </h4>
                              <ul className="space-y-3">
                                 {selectedCareer.requisitos.map((item, idx) => (
                                   <li key={idx} className="text-[10px] sm:text-xs font-bold text-secondary flex gap-2">
                                      <Check className="size-3 text-primary shrink-0" /> {item}
                                    </li>
                                 ))}
                              </ul>
                            </div>
                         </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:px-16 md:py-8 border-t border-gray-100 bg-neutral flex flex-row justify-between items-center gap-4 md:gap-6 shrink-0 z-10">
                 <div>
                    <span className="tag-label block mb-1 text-[8px] md:text-[10px]">Duración del Programa</span>
                    <ul className="flex flex-col gap-1 mt-1">
                      {selectedCareer.duration.split(' / ').map((d, i) => (
                        <li key={i} className="text-xs sm:text-sm md:text-xl font-black text-secondary uppercase italic flex items-center gap-1.5 leading-none">
                          <Check className="size-3 md:size-4 text-primary shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
                 <a 
                    href={(selectedCareer as any).whatsapp || "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n."} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 text-center bg-primary text-white px-5 py-3 sm:px-6 sm:py-4 md:px-10 md:py-5 rounded-xl font-black uppercase text-[8px] md:text-[10px] tracking-[0.2em] shadow-primary-glow hover:scale-105 transition-transform"
                 >
                    Inscribirse ahora
                 </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Specialized Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-secondary/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden max-h-[92vh] md:max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 size-10 md:size-12 bg-neutral/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all font-black shadow-lg"
              >
                ✕
              </button>
              
              <div className="flex-grow overflow-y-auto overscroll-contain">
                <div className="grid grid-cols-1 lg:grid-cols-5 h-auto">
                  <div className="lg:col-span-2 relative min-h-[250px] md:min-h-[300px]">
            <img 
              src={selectedCourse.image} 
              className="absolute inset-0 w-full h-full object-cover" 
              fetchPriority="high"
              decoding="sync"
            />
                    <div className="absolute inset-0 bg-secondary/10" />
                  </div>
                  <div className="lg:col-span-3 p-10 md:p-16">
                    <span className="tag-label text-primary mb-4 block">Curso de Especialización</span>
                    <h2 className="text-4xl md:text-5xl mb-8 leading-none italic font-black">{selectedCourse.title}</h2>
                    
                    <div className="space-y-8">
                      <section>
                        <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Descripción
                        </h4>
                        <p className="text-gray-500 font-light leading-relaxed">{selectedCourse.description}</p>
                      </section>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {selectedCourse.puntosImportantes && selectedCourse.puntosImportantes.length > 0 && (
                          <section>
                            <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-4 text-primary italic flex items-center gap-2">
                               <CheckCircle2 size={14} /> Puntos Importantes
                            </h4>
                            <ul className="space-y-2">
                              {selectedCourse.puntosImportantes.map((item, idx) => (
                                <li key={idx} className="text-[10px] sm:text-xs font-bold text-secondary flex gap-2 leading-tight">
                                  <span className="text-primary">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}
                        {selectedCourse.planEstudios && selectedCourse.planEstudios.length > 0 && (
                          <section>
                            <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-4 text-primary italic flex items-center gap-2">
                               <Layers size={14} /> Plan de Estudios
                            </h4>
                            <ul className="space-y-2">
                              {selectedCourse.planEstudios.map((item, idx) => (
                                <li key={idx} className="text-[10px] sm:text-xs font-bold text-secondary flex gap-2 leading-tight">
                                  <span className="text-primary">/</span> {item}
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}
                      </div>

                      {selectedCourse.entrenamiento && (
                        <section className="bg-neutral p-6 rounded-2xl border border-gray-100 mt-8">
                          <h4 className="text-xs uppercase font-black tracking-widest text-secondary mb-3">Entrenamiento Práctico</h4>
                          <p className="text-gray-500 text-xs font-light leading-relaxed">{selectedCourse.entrenamiento}</p>
                        </section>
                      )}

                      {(selectedCourse as any).nota && (
                        <section className="bg-amber-50 p-6 rounded-2xl border border-amber-200 mt-8">
                          <h4 className="text-xs uppercase font-black tracking-widest text-amber-700 mb-3 flex items-center gap-2">
                            <Info size={14} /> Nota Importante
                          </h4>
                          <p className="text-amber-800 text-xs font-medium leading-relaxed">
                            {(selectedCourse as any).nota}
                          </p>
                        </section>
                      )}

                      {(selectedCourse as any).paquetes && (selectedCourse as any).paquetes.length > 0 && (
                        <section className="bg-primary/5 p-6 rounded-2xl border border-primary/20 mt-8">
                          <h4 className="text-xs uppercase font-black tracking-widest text-primary mb-4 italic flex items-center gap-2">
                             <Sparkles size={14} /> Paquetes de Horas
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {(selectedCourse as any).paquetes.map((pkg: any, idx: number) => (
                              <div key={idx} className="bg-white p-4 rounded-xl border border-primary/10 shadow-sm flex flex-col items-center text-center">
                                <span className="text-[10px] uppercase font-black text-gray-400 mb-1">{pkg.label}</span>
                                <span className="text-lg font-black text-secondary leading-tight italic">{pkg.price.split(' ')[0]}</span>
                                <span className="text-[9px] font-bold text-primary uppercase">{pkg.price.split(' ').slice(1).join(' ')}</span>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:px-16 md:py-8 border-t border-gray-100 bg-neutral flex flex-row justify-between items-center gap-4 md:gap-6 shrink-0 z-10">
                 <div>
                    <span className="tag-label block mb-1 text-[8px] md:text-[10px]">Duración del Curso</span>
                    <ul className="flex flex-col gap-1 mt-1">
                      {selectedCourse.duracion.split(' / ').map((d, i) => (
                        <li key={i} className="text-xs sm:text-sm md:text-xl font-black text-secondary uppercase italic flex items-center gap-1.5 leading-none">
                          <Check className="size-3 md:size-4 text-primary shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
                 <a 
                    href={(selectedCourse as any).whatsapp || "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n."} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 text-center bg-primary text-white px-5 py-3 sm:px-6 sm:py-4 md:px-10 md:py-5 rounded-xl font-black uppercase text-[8px] md:text-[10px] tracking-[0.2em] shadow-primary-glow hover:scale-105 transition-transform"
                 >
                    Solicitar Info
                 </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              <X size={32} />
            </button>
            <button
              className="absolute left-6 p-4 text-white hover:text-primary z-50"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + facilitiesImages.length) % facilitiesImages.length); }}
            >
              <ChevronLeft size={48} />
            </button>
            <button
              className="absolute right-6 p-4 text-white hover:text-primary z-50"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % facilitiesImages.length); }}
            >
              <ChevronRight size={48} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={facilitiesImages[lightboxIndex].src}
              alt={facilitiesImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative h-[95vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Avión despegando al atardecer"
            className="w-full h-full object-cover scale-105 opacity-60"
            style={{ backgroundColor: '#000000' }}
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-[10px] text-white/70 tracking-[0.3em] font-bold uppercase mb-4 block">Inscripciones abiertas 2026</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold tracking-tight leading-[0.9] mb-8">
              Forjando el futuro <br />
              <span className="text-primary">Aeronáutico.</span>
            </h1>
            <p className="text-gray-200 text-base md:text-lg lg:text-xl mb-10 leading-relaxed font-light">
              Forjando profesionales con estándares internacionales en México. Despega tu carrera hoy en la mejor escuela de aviación en Cancún.
            </p>
            <div className="flex flex-row gap-3 sm:gap-4">
              <a
                href="https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-3 sm:px-8 sm:py-4 rounded-lg font-bold uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-primary-glow flex-1 sm:flex-none"
              >
                Inscríbete
                <ArrowRight size={14} className="sm:size-4" />
              </a>
              <a
                href="#carreras"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-lg font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-white/20 transition-all text-center flex-1 sm:flex-none"
              >
                Catálogo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carreras Section */}
      <section id="carreras" className="py-24 bg-white scroll-mt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <span className="tag-label text-primary mb-4 block">Programas Profesionales</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6">Elige tu Carrera</h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Selecciona una especialidad para ver el plan de estudios, requisitos y entrenamiento práctico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-6">
            {careers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCareer(career)}
                className="group relative min-h-[180px] sm:min-h-[280px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer col-span-1 md:col-span-5 border border-secondary shadow-primary-glow/10 hover:shadow-2xl transition-all duration-300"
              >
                <img 
                  src={career.image} 
                  alt={career.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-secondary/60 group-hover:bg-secondary/40 transition-all duration-500 z-10" />
                
                <div className="absolute inset-0 z-20 p-3 sm:p-5 lg:p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-1 sm:mb-4 relative z-10">
                    <span className="text-[6px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] block text-primary">Carrera Profesional</span>
                  </div>

                  <div className="relative z-10 mb-2 sm:mb-4 max-w-lg">
                    <h3 className="font-black leading-tight group-hover:translate-x-1 transition-transform italic mr-1 text-white text-lg md:text-3xl lg:text-4xl mb-1 sm:mb-2">{career.title}</h3>
                    <p className="text-[11px] sm:text-sm text-gray-300 line-clamp-3 sm:line-clamp-2 font-light leading-relaxed max-w-xs">
                      {career.shortDesc}
                    </p>
                  </div>

                  <div className="mt-auto relative z-10">
                    <div className="bg-primary hover:bg-red-600 text-white w-fit px-3 py-2 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-[7px] sm:text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1 sm:gap-2">
                      Ver ficha <ArrowRight size={10} className="sm:size-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos Section (Merged from Courses.tsx) */}
      <section id="cursos" className="py-24 bg-neutral scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10 sm:mb-16">
            <Zap className="text-primary size-6 sm:size-8" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">Cursos & Especialización</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-10 gap-3 sm:gap-6">
            {/* Featured Courses First */}
            <CourseCard 
              title="Introducción al A320"
              tagline="Airbus Series"
              desc="Curso técnico profundo sobre los sistemas, filosofía y operación de la familia A320."
              icon={Plane}
              featured={true}
              image={a320Img}
              onClick={() => setSelectedCourse(specializedCourses[0])}
            />
            <CourseCard 
              title="Sobrecargo Ejecutivo"
              tagline="Curso VIP"
              desc="Aviación privada de lujo. Protocolo VIP, gastronomía y servicio de primera clase."
              icon={Sparkles}
              featured={true}
              image={ejecutivoImg}
              onClick={() => setSelectedCourse(specializedCourses[1])}
            />

            {/* Standard Courses */}
            <CourseCard 
              title="CFIT"
              tagline="Controlled Flight"
              desc="Prevención de impacto contra el terreno sin pérdida de control."
              icon={ShieldCheck}
              onClick={() => setSelectedCourse(specializedCourses[3])}
            />
            <CourseCard 
              title="ALAR"
              tagline="Approach/Landing"
              desc="Estrategias críticas para la fase más compleja del vuelo."
              icon={Target}
              onClick={() => setSelectedCourse(specializedCourses[4])}
            />
            <CourseCard 
              title="CRM"
              tagline="Resource Mgmt"
              desc="Optimización del trabajo en equipo y toma de decisiones."
              icon={Users}
              onClick={() => setSelectedCourse(specializedCourses[2])}
            />
            <CourseCard 
              title="Hora de Simulador"
              tagline="Entrenamiento"
              desc="Horas de vuelo en nuestros entrenadores sintéticos."
              icon={Target}
              onClick={() => setSelectedCourse(specializedCourses[5])}
            />
            <CourseCard 
              title="Simulador VR"
              tagline="Next Gen"
              desc="Entrenamiento inmersivo en realidad virtual."
              icon={Zap}
              onClick={() => setSelectedCourse(specializedCourses[6])}
            />
          </div>
        </div>
      </section>

      {/* Beneficios y Convenios Section */}
      <section id="convenios" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="tag-label text-primary mb-4 block">Alianzas Estratégicas</span>
              <h2 className="text-3xl sm:text-5xl font-black text-secondary tracking-tighter">
                Beneficios <span className="text-primary italic">& Convenios.</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg font-light mt-6 leading-relaxed">
                Diseñamos convenios exclusivos para brindarte valor agregado a tu matrícula y facilitar tu camino hacia el éxito aeronáutico.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <BenefitCard 
              icon={<Stethoscope className="text-primary size-6" />}
              title="SkyMedik"
              benefit="15% de Descuento"
              desc="En tu examen médico de aptitud psicofísica. Realízalo de manera rápida y eficiente con especialistas."
              index={0}
            />
            <BenefitCard 
              icon={<Languages className="text-primary size-6" />}
              title="Inglés Individual"
              benefit="50% de Descuento"
              desc="En el curso completo de 12 meses. Domina el idioma indispensable para la aviación internacional."
              index={1}
            />
            <BenefitCard 
              icon={<Building2 className="text-primary size-6" />}
              title="Sindicato CTM"
              benefit="Descuento Especial"
              desc="Beneficios exclusivos para agremiados y familiares directos en todas nuestras carreras y cursos."
              index={2}
            />
            <BenefitCard 
              icon={<Users2 className="text-primary size-6" />}
              title="Sindicato CROC"
              benefit="Descuento Especial"
              desc="Tarifas preferenciales para miembros agremiados, apoyando el crecimiento profesional de sus integrantes."
              index={3}
            />
          </div>
          
          <div className="mt-12 p-8 bg-neutral rounded-[32px] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                   <Info className="text-primary size-6" />
                </div>
                <p className="text-secondary font-bold text-sm md:text-base italic">Consulta términos y condiciones de cada convenio con nuestro equipo de admisiones.</p>
             </div>
             <a 
                href="https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20convenios%20y%20los%20beneficios%20de%20ser%20ICAAS." 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-secondary text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-colors whitespace-nowrap shadow-xl"
             >
                Solicitar Info
             </a>
          </div>
        </div>
      </section>

      {/* Nosotros Section (Merged from AboutUs.tsx) */}
      <section id="nosotros" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="tag-label text-primary mb-6 block">Sobre la escuela</span>
              <h2 className="text-3xl sm:text-5xl mb-8 leading-[0.9]">
                Excelencia en el <br /><span className="text-primary italic">Caribe Mexicano.</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg font-light leading-relaxed">
                ICAAS nace de la necesidad de dotar al Aeropuerto Internacional de Cancún y a la región de profesionales altamente capacitados bajo estándares de aerolíneas globales.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-5 sm:p-10 bg-neutral rounded-[28px] sm:rounded-[40px] flex flex-col gap-4 sm:gap-6">
                 <Target className="text-primary size-7 sm:size-10" />
                 <h4 className="text-lg sm:text-2xl font-black">Misión</h4>
                 <p className="text-gray-500 text-[9px] sm:text-xs font-light leading-relaxed">Proveer una formación técnica superior basada en la seguridad y profesionalismo internacional.</p>
              </div>
              <div className="p-5 sm:p-10 bg-secondary text-white rounded-[28px] sm:rounded-[40px] flex flex-col gap-4 sm:gap-6">
                 <Eye className="text-primary size-7 sm:size-10" />
                 <h4 className="text-lg sm:text-2xl font-black text-white">Visión</h4>
                 <p className="text-white text-[9px] sm:text-xs font-light leading-relaxed">Ser la escuela líder en innovación tecnológica y simulación de vuelo en Latinoamérica.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24">
             <ValueItem 
               title="Responsabilidad" 
               desc="Nos comprometemos a cumplir en tiempo y forma las obligaciones morales y legales, aceptando las consecuencias de nuestros actos." 
             />
             <ValueItem 
               title="Profesionalismo" 
               desc="Nuestra capacidad de ser eficaces y competentes en la realización de nuestras labores y formación académica." 
             />
             <ValueItem 
               title="Ética" 
               desc="Base de nuestras acciones como una institución educativa que forma parte del futuro de la aviación en México." 
             />
             <ValueItem 
               title="Normatividad" 
               desc="Marco que rige nuestra disciplina y procedimientos, garantizando el cumplimiento de los estándares aeronáuticos." 
             />
          </div>

          {/* New Facilities Subsection */}
          <div id="instalaciones" className="mt-32 scroll-mt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <span className="tag-label text-primary mb-4 block">Entorno Profesional</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black italic">Instalaciones de Vanguardia</h3>
                <p className="text-gray-500 text-base sm:text-lg font-light mt-6 leading-relaxed">
                  Espacios diseñados para simular entornos reales de trabajo, equipados con la última tecnología en simulación y ayudas académicas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 md:grid-rows-2 gap-3 sm:gap-6 h-auto md:h-[320px]">
              {/* Main Feature Image */}
              <div 
                onClick={() => setLightboxIndex(0)}
                className="h-32 sm:h-40 md:h-full col-span-2 md:col-span-2 md:row-span-2 rounded-[20px] sm:rounded-[24px] md:rounded-[40px] overflow-hidden relative group cursor-pointer"
              >
                <img 
                  src={facilitiesImages[0].src} 
                  alt={facilitiesImages[0].alt} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Smaller Grid Images */}
              {facilitiesImages.slice(1).map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setLightboxIndex(index + 1)}
                  className="h-28 sm:h-36 md:h-full rounded-[20px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden relative group cursor-pointer"
                >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-neutral/30 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="tag-label text-primary mb-4 block">Preguntas frecuentes</span>
            <h2 className="text-3xl sm:text-5xl font-black text-secondary tracking-tighter">Despeja tus <span className="text-primary italic">dudas.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                question: "¿Cuales son los requisitos para la carrera de Sobrecargo de aviación u Oficial de operaciones?",
                answer: "Acta de nacimiento (18+), Certificado de bachillerato / Preparatoria, 4 fotografías tamaño pasaporte, Constancia de aptitud psicofísicasica clase 3."
              },
              {
                question: "¿Cuál es la duración de las carreras?",
                answer: "La duración depende de la carrera y de la modalidad que selecciones.\n\nSobrecargo de aviación: 6 o 10 meses.\nOficial de operaciones: 7 o 10 meses."
              },
              {
                question: "¿Qué modalidades ofrecen?",
                answer: "Escolarizado (L - V): 3 horas al día.\nSabatino (solo sábados): 5 horas al día."
              },
              {
                question: "¿Tienen diferentes opciones de pago?",
                answer: "Si, tenemos diferentes opciones de método de pago y de modelos de pago para que se ajusten a tus necesidades. Contáctanos para conocer como te podemos ayudar a que cumplas tu sueño aeronáutico."
              },
              {
                question: "¿Qué beneficios tienen para los alumnos?",
                answer: "Tenemos diferentes convenios diseñados para brindarle a nuestros alumnos valor agregado a su matrícula.\n\nConvenio de Inglés: Con Inglés Individual, obtén 50% de descuento en el curso completo.\nConvenio SkyMedic: 15% de descuento en examen médico para realizarlo de manera rápida y eficiente."
              },
              {
                question: "¿Qué costos no están incluidos en la carrera?",
                answer: "El uniforme, el examen médico y el sinodal práctico no están incluidos en el costo de la carrera."
              },
              {
                question: "¿Cómo puedo recibir más información o agendar una visita a la escuela?",
                answer: "Nos puedes contactar a nuestro número de teléfono y Whatsapp: (998) 874 58 8, por correo a hola@vuela-caas.com o llenando el formulario en la Sección de contacto."
              }
            ].map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onToggle={() => { setOpenFAQIndex(openFAQIndex === index ? null : index); }}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 font-light italic">¿Tienes otra pregunta? <a href="#contacto" className="text-primary font-bold hover:underline">Contáctanos directamente.</a></p>
          </div>
        </div>
      </section>

      {/* Contacto Section (Merged from Contact.tsx) */}
      <section id="contacto" className="py-24 bg-neutral border-t border-gray-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl mb-4 text-secondary font-black tracking-tighter">Hablemos del <span className="text-primary">futuro.</span></h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto font-light">
              ¿Tienes dudas sobre los requisitos o el proceso de inscripción? Nuestro equipo está listo para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
             <div className="lg:col-span-1 flex flex-col gap-4 md:gap-5">
                <ContactInfoCard 
                  icon={<Phone className="text-primary size-5" />}
                  title="Llámanos / WhatsApp"
                  detail="998 751 0172"
                  sub="Lun - Vie, 9am - 6pm"
                  href="https://wa.me/529987510172"
                />
                <ContactInfoCard 
                  icon={<Mail className="text-primary size-5" />}
                  title="Escríbenos"
                  detail="hola@vuela-caas.com"
                  sub="Respuesta rápida"
                  href="mailto:hola@vuela-caas.com"
                />
                <ContactInfoCard 
                  icon={<MapPin className="text-primary size-5" />}
                  title="Visítanos"
                  detail="Pabellón Bonampak"
                  sub="Locales 205-206, Cancún"
                  href="https://www.google.com/maps/search/?api=1&query=Pabellón+Bonampak+Av.+Sayil+Cancun"
                />
             </div>

             <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-sleek border border-gray-100">
                <h3 className="text-2xl font-black mb-8 italic">Inicia tu Solicitud</h3>
                {submitSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-3xl text-center">
                    <CheckCircle2 size={48} className="mx-auto mb-4 text-green-500" />
                    <h4 className="text-2xl font-black mb-2">¡Solicitud Enviada!</h4>
                    <p className="font-light">Nos pondremos en contacto contigo muy pronto.</p>
                  </div>
                ) : (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleFormSubmit}>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-black tracking-widest text-gray-400 px-1">Nombre</label>
                        <input type="text" name="nombre" placeholder="Ej. Juan Pérez" className="bg-neutral p-3.5 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-light text-sm" required />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-black tracking-widest text-gray-400 px-1">Correo</label>
                        <input type="email" name="correo" placeholder="juan@ejemplo.com" className="bg-neutral p-3.5 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-light text-sm" required />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-black tracking-widest text-gray-400 px-1">Celular</label>
                        <input type="tel" name="celular" placeholder="998 000 0000" className="bg-neutral p-3.5 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-light text-sm" required />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-black tracking-widest text-gray-400 px-1">Carrera o curso de interés</label>
                        <select name="curso" className="bg-neutral p-3.5 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-light text-sm appearance-none" required defaultValue="">
                           <option value="" disabled>Selecciona una opción</option>
                           <optgroup label="Carreras">
                             <option value="Sobrecargo de Aviación">Sobrecargo de Aviación</option>
                             <option value="Oficial de Operaciones">Oficial de Operaciones</option>
                           </optgroup>
                           <optgroup label="Cursos">
                             <option value="CFIT">CFIT</option>
                             <option value="ALAR">ALAR</option>
                             <option value="CRM">CRM</option>
                             <option value="Introducción al A320">Introducción al A320</option>
                             <option value="Sobrecargo Ejecutivo">Sobrecargo Ejecutivo</option>
                             <option value="Simulador VR">Simulador VR</option>
                             <option value="Hora de Simulador">Hora de Simulador</option>
                           </optgroup>
                        </select>
                     </div>
                     <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-[9px] uppercase font-black tracking-widest text-gray-400 px-1">Mensaje</label>
                        <textarea name="mensaje" rows={3} placeholder="Cuéntanos tus dudas..." className="bg-neutral p-3.5 rounded-xl border border-transparent focus:border-primary outline-none transition-all font-light text-sm" />
                     </div>
                     <div className="md:col-span-2">
                        <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-primary-glow hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100">
                           {isSubmitting ? 'Enviando...' : (
                             <>Enviar Solicitud <Send size={14} className="inline ml-2" /></>
                           )}
                        </button>
                     </div>
                  </form>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
    <section className="h-[350px] w-full relative overflow-hidden bg-neutral">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.893874312683!2d-86.8276707!3d21.1566857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2c0617300001%3A0x7d00f72a6a6a6a6a!2sPabellon%20Bonampak!5e0!3m2!1ses-419!2smx!4v1714500000000!5m2!1ses-419!2smx"
          className="w-full h-full grayscale-[0.8] contrast-[1.2] opacity-80"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute top-10 right-10 z-10 hidden md:block">
           <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-2xl max-w-sm">
              <span className="tag-label text-primary mb-2 block font-black">Nuestra Sede</span>
              <h3 className="text-2xl font-black text-secondary mb-4 italic">ICAAS</h3>
              <p className="text-[10px] text-gray-500 font-light leading-relaxed mb-6">Ubicados en Pabellón Bonampak, Av. Sayil, Manzana 5, Lote 2, Locales 205 y 206, Supermanzana 6, Cancún, Quintana Roo.</p>
              <div className="flex flex-col gap-3">
                <a href="https://wa.me/529987510172" className="flex items-center gap-3 text-secondary font-black text-[10px] tracking-widest uppercase hover:text-primary transition-colors">
                  <Phone size={16} className="text-primary" />
                  998 751 0172
                </a>
                <a href="https://www.google.com/maps/search/?api=1&query=Pabellón+Bonampak+Av.+Sayil+Cancun" className="flex items-center gap-3 text-secondary font-black text-[10px] tracking-widest uppercase hover:text-primary transition-colors">
                   <MapPin size={16} className="text-primary" />
                   Pabellón Bonampak, Cancún
                </a>
              </div>
           </div>
        </div>
      </section>

      {/* Floating Buttons */}
      {(!selectedCareer && !selectedCourse) && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col gap-3 md:gap-4">
          <a 
            href="https://www.instagram.com/icaascancun?igsh=MWRnN2F4aHcyMWUzcw%3D%3D&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative"
            aria-label="Instagram"
          >
            <Instagram className="size-6 md:size-7" />
            <span className="absolute right-full mr-4 bg-white text-secondary text-[10px] font-black px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-gray-100 pointer-events-none uppercase tracking-widest hidden md:block">
              Síguenos en Instagram
            </span>
          </a>
          <a 
            href="https://wa.me/529987510172" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative"
            aria-label="WhatsApp"
          >
            <MessageCircle className="size-6 md:size-7" fill="currentColor" />
            <span className="absolute right-full mr-4 bg-white text-secondary text-[10px] font-black px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-gray-100 pointer-events-none uppercase tracking-widest hidden md:block">
              Chatea con nosotros
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

function CourseCard({ title, tagline, desc, icon: Icon = Layers, featured = false, image, onClick }: { title: string, tagline: string, desc: string, icon?: any, featured?: boolean, image?: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`p-3 sm:p-5 lg:p-6 rounded-[24px] sm:rounded-[28px] hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 border group flex flex-col h-full relative overflow-hidden ${
      featured 
        ? 'bg-secondary text-white border-secondary shadow-primary-glow/20 col-span-2 md:col-span-5 min-h-[150px] sm:min-h-[280px] cursor-pointer' 
        : 'bg-white text-secondary border-gray-100 col-span-1 md:col-span-2 md:min-h-[220px]'
    }`}>
      {featured && image && (
        <>
                <img 
                  src={image} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 z-0"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
          <div className="absolute inset-0 bg-secondary/60 group-hover:bg-secondary/40 transition-colors z-[1]" />
        </>
      )}
      {featured && (
        <div className="absolute top-4 right-4 sm:top-10 sm:right-10 z-10">
           <div className="bg-primary text-white text-[6px] sm:text-[8px] font-black px-2 py-1 sm:px-3 sm:py-1.5 rounded uppercase tracking-[0.3em]">Especializado</div>
        </div>
      )}
      <div className={`flex justify-between items-start relative z-10 ${featured ? 'mb-1 sm:mb-8' : 'mb-4 sm:mb-8'}`}>
        <span className="text-[6px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] block text-primary">{tagline}</span>
        {!featured && <Icon className="text-gray-200 group-hover:text-primary transition-colors shrink-0 size-3.5 sm:size-5" />}
      </div>
      <div className={`relative z-10 ${featured ? 'mb-2 sm:mb-4 max-w-lg' : 'mb-2'}`}>
        <h3 className={`font-black leading-tight group-hover:translate-x-1 transition-transform italic mr-1 ${
          featured ? 'text-lg md:text-3xl lg:text-4xl mb-1 sm:mb-2' : 'text-xs sm:text-lg mb-0.5'
        } ${featured ? 'text-white' : 'text-secondary'}`}>{title}</h3>
        <p className={`font-light leading-relaxed ${
          featured ? 'text-[11px] sm:text-sm text-gray-300 line-clamp-3 sm:line-clamp-2' : 'text-[8px] sm:text-[10px] text-gray-500 line-clamp-2 lg:line-clamp-none'
        }`}>{desc}</p>
      </div>
      
      {featured ? (
        <div className="mt-auto flex items-center gap-2 sm:gap-4 relative z-10">
          <button className="bg-primary hover:bg-red-600 text-white px-3 py-2 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-[7px] sm:text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1 sm:gap-2">
            Ver Plan <ArrowRight size={10} className="sm:size-3.5" />
          </button>
          {!image && <Icon className="absolute -bottom-10 -right-10 text-white/5 size-64 -rotate-12 pointer-events-none" />}
        </div>
      ) : (
        <div className="mt-auto pt-2 sm:pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="text-primary text-[7px] sm:text-[8px] font-black uppercase tracking-widest flex items-center gap-1">Info <ArrowRight size={8} /></button>
        </div>
      )}
    </div>
  )
}

function ValueItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:border-primary/20 transition-all">
       <h4 className="text-base md:text-lg lg:text-xl font-bold text-primary mb-2 sm:mb-3 italic">{title}</h4>
       <p className="text-gray-500 text-[8px] sm:text-[11px] font-light leading-relaxed">{desc}</p>
    </div>
  )
}

function ContactInfoCard({ icon, title, detail, sub, href }: { icon: React.ReactNode, title: string, detail: string, sub: string, href?: string }) {
  const content = (
    <div className="bg-white p-4 lg:p-5 rounded-2xl md:rounded-3xl flex gap-3 lg:gap-4 items-center shadow-sm border border-gray-100 hover:border-primary/50 transition-all group h-full">
       <div className="size-10 lg:size-11 bg-neutral rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
          {icon}
       </div>
       <div>
          <h4 className="text-[7px] uppercase tracking-widest font-black text-gray-400 mb-0.5">{title}</h4>
          <p className="text-xs lg:text-sm font-black text-secondary leading-tight mb-0.5 group-hover:text-primary transition-colors">{detail}</p>
          <p className="text-[8px] text-gray-500 leading-none">{sub}</p>
       </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">
        {content}
      </a>
    );
  }

  return content;
}

function BenefitCard({ icon, title, benefit, desc, index = 0 }: { icon: React.ReactNode, title: string, benefit: string, desc: string, index?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="bg-neutral p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
    >
       <div className="size-10 sm:size-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm group-hover:scale-110 transition-transform">
          {React.cloneElement(icon as React.ReactElement, { size: undefined, className: (icon as React.ReactElement).props.className?.replace('size-6', 'size-5 sm:size-6') })}
       </div>
       <h4 className="text-[8px] sm:text-[10px] uppercase font-black tracking-widest text-gray-400 mb-2">{title}</h4>
       <div className="text-sm sm:text-xl font-black text-secondary mb-2 sm:mb-3 italic group-hover:text-primary transition-colors">{benefit}</div>
       <p className="text-gray-500 text-[9px] sm:text-xs font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function BadgePercent({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <circle cx="9" cy="9" r=".5" />
      <circle cx="15" cy="15" r=".5" />
    </svg>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`transition-all duration-300 rounded-xl p-3.5 sm:p-4 h-fit ${isOpen ? 'bg-secondary text-white ring-2 ring-primary/20' : 'bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg'}`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-start text-left gap-2 group"
      >
        <span className={`text-[12px] sm:text-[14px] font-bold leading-tight transition-colors ${isOpen ? 'text-white' : 'text-secondary group-hover:text-primary'}`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={`flex-shrink-0 size-5 rounded-full border flex items-center justify-center transition-colors mt-0.5 ${
            isOpen ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-400 group-hover:border-primary group-hover:text-primary'
          }`}
        >
          <Plus size={12} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`pt-2 text-[10px] sm:text-[12px] font-light leading-relaxed whitespace-pre-line ${isOpen ? 'text-gray-300' : 'text-gray-500'}`}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
