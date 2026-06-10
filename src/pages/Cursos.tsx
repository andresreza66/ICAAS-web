import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import {   Plane, ShieldCheck, Target, Users, Sparkles, Zap, 
  Clock, ArrowRight, CheckCircle2, X, Phone, MessageCircle, 
  HelpCircle, GraduationCap, Award, FileText, CheckCircle, 
  Activity, BookOpen, ShieldAlert, BadgeInfo, Layers, ClipboardList,
  MapPin, ChevronDown
} from 'lucide-react';
import { LazyMap } from '../components/LazyMap';

// Import image assets
import a320Img from '../assets/images/regenerated_image_1777733588143_opt.jpg';
import ejecutivoImg from '../assets/images/regenerated_image_1777628075067_opt.jpg';
import genericImg from '../assets/images/regenerated_image_1777580804672_opt.png';
import simuladorVRImg from '../assets/images/regenerated_image_1777904006862.jpg';
import horaSimuladorImg from '../assets/images/regenerated_image_1777927339271.png';

interface CourseType {
  id: string;
  title: string;
  tagline: string;
  category: 'especializacion' | 'periodicos' | 'aficionados';
  categoryLabel: string;
  fichaCode: string; // Aviation technical document code
  format: string; // e.g. Presencial / Práctico en Simulador
  targetAudience: string; // e.g. Dirigido a...
  requirements: string[]; // Prerrequisitos de admisión
  description: string;
  overviewDescription: string; // Detail overview paragraph
  puntosImportantes: string[];
  planEstudios: string[]; // Temario por módulos
  entrenamiento?: string;
  duracion: string;
  paquetes?: { label: string; price: string }[];
  nota?: string;
  image: string;
  whatsapp: string;
}

export default function Cursos({ id }: { id: string }) {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  useSEO({
    title: "Cursos de Adiestramiento y Especialización Aeronáutica | ICAAS Cancún",
    description: "Explora nuestros cursos de adiestramiento y especialización en aviación en Cancún: Introducción al Airbus A320, Vuelo por Instrumentos, Inglés de Aviación ICAO, Alpa Jet y adiestramiento en simuladores de vuelo interactivos.",
    path: "/cursos",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Cursos de Adiestramiento y Especialización Aeronáutica | ICAAS Cancún",
      "description": "Lista de cursos académicos, temarios y programas de entrenamiento aeronáutico avanzado e interactivo en simuladores de vuelo comerciales.",
      "url": "https://vuela-icaas.com/cursos",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Introducción al Airbus A320"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Transición de Cabina de Cristal (CRM, ALPA)"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Inglés de Aviación RTARI (ICAO Level)"
        }
      ]
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  const coursesList: CourseType[] = [
    // --- SPECIALIZATION COURSES FIRST ---
    {
      id: "a320",
      title: "Introducción al A320",
      tagline: "Airbus Series",
      category: 'especializacion',
      categoryLabel: "Curso de Especialización Profesional",
      fichaCode: "ICAAS-SPEC-A320",
      format: "Presencial (Teórico y práctico en cabina)",
      targetAudience: "Aspirantes a aerolínea, pilotos comerciales formándose, y aviadores en transición técnica de aeronaves de pistón o turbohélices a reactores comerciales.",
      requirements: [
        "Licencia de Piloto Comercial aprobada (o en proceso de formación teórica)",
        "Nivel de inglés técnico aeronáutico recomendado",
        "Muchas ganas de dominar la filosofía de automatización de Airbus"
      ],
      description: "Curso introductorio a la filosofía Airbus y a los sistemas estructurales, lógicas de automatización y procedimientos operativos del A320.",
      overviewDescription: "El programa integral de Introducción al A320 adopta los estándares internacionales más rigurosos basados en el concepto de cooperación multicrew (APS MCC). Desarrollarás las destrezas fundamentales para dominar la dinámica de vuelo en un reactor moderno, comprendiendo la interacción del piloto con la tecnología avanzada y el trabajo coordinado de cabina.",
      puntosImportantes: [
        "Formación integral basada en el estándar APS MCC, alineada a operaciones reales de aerolínea.",
        "Enfoque activo en el desarrollo de CRM (Crew Resource Management).",
        "Introducción profunda a la filosofía Airbus de automatización y redundancia de sistemas.",
        "Explicación técnica de la lógica de mandos Fly-by-Wire y leyes de control.",
        "Uso operativo de la computadora de guiado (FMS), autopilot y autothrust.",
        "Lectura, monitoreo e interpretación ágil de la pantalla FMA (Flight Mode Annunciator).",
        "Aplicación práctica de SOPs (Procedimientos Operativos Estándar) en entorno multicrew.",
        "Estrategias estructuradas para resolver exámenes de ingreso teórico y simuladores de aerolínea."
      ],
      planEstudios: [
        "Módulo 1: Filosofía y Reglas del Concepto APS MCC",
        "Módulo 2: Lógicas Generales de Diseño Airbus (Fly-by-Wire / EFIS)",
        "Módulo 3: Automatización y Gestión de Vuelo mediante la FMGC/FMS",
        "Módulo 4: Análisis e Integración de los Procedimientos Estándar (SOPs)",
        "Módulo 5: Cabina Fría (Cockpit Familiarization) & Flujos de Trabajo",
        "Módulo 6: Perfiles de Vuelo y Preparación Técnica para Simulador"
      ],
      entrenamiento: "Introducción y SOPs básicos, Automatización básica, Perfil de vuelo completo, Escenarios complejos, Line Oriented Flight Training.",
      duracion: "24 h Teoría / 20 h Simulador de Vuelo",
      paquetes: [],
      image: a320Img,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20curso%20de%20Introducci%C3%B3n%20al%20A320."
    },
    {
      id: "ejecutivo",
      title: "Sobrecargo Ejecutivo VIP",
      tagline: "Aviación Corporativa de Lujo",
      category: 'especializacion',
      categoryLabel: "Curso de Especialización Profesional",
      fichaCode: "ICAAS-SPEC-VIP",
      format: "Presencial (Teorías intensivas y simulacros de asistencia en cabina VIP)",
      targetAudience: "Sobrecargos certificados, estudiantes de aviación, profesionales de hotelería/hospitalidad de lujo o servicio al cliente Premium que deseen ingresar al selecto sector de la aviación privada nacional e internacional.",
      requirements: [
        "Estudios concluidos de nivel preparatoria o bachillerato",
        "Licencia de Sobrecargo de Aviación recomendada para ejercicio profesional inmediato (no obligatoria para tomar el entrenamiento educativo)",
        "Excelente presentación, actitud de servicio impecable y discreción"
      ],
      description: "Especialización para sobrecargos que desean ingresar al mundo de la aviación privada de lujo. Aprende los protocolos más exigentes de servicio VIP y atención a pasajeros de alto perfil.",
      overviewDescription: "Este exclusivo taller te brinda una preparación robusta en el dinámico ecosistema de los vuelos de negocios, yates voladores y aviación corporativa de ultra lujo. Brindarás un servicio personalizado de clase mundial, gestionando desde la logística de catering gourmand internacional, selección y servicio de maridaje fino, hasta los más estrictos estándares de etiqueta y discreción corporativa requeridos por los clientes VIP.",
      puntosImportantes: [
        "Comprensión de las diferencias clave entre aviación de línea comercial y ejecutiva.",
        "Protocolo, etiqueta y refinamiento de primer nivel nacional e internacional.",
        "Logística avanzada de catering gourmet: compras, conservación de cadena de frío y presentación.",
        "Fundamentos de enología y técnicas refinadas del servicio del vino y licores premium.",
        "Servicio al cliente ultra-personalizado y discretas tácticas de comunicación efectiva.",
        "Simulación interactiva y montaje de mesas de protocolo en aeronaves corporativas."
      ],
      planEstudios: [
        "Módulo 1: Introducción a la Industria de la Aviación Corporativa y Ejecutiva",
        "Módulo 2: Especificaciones técnicas de aviones Ejecutivos modernos",
        "Módulo 3: Etiqueta Profesional, Vocabulario Técnico, Vestuario e Higiene VIP",
        "Módulo 4: El Ciclo de Catering: Abastecimiento, Menaje, Calentamiento y Vajillas",
        "Módulo 5: Servicio del Vino y Destilados finos (Conceptos de Maridaje y Sommelier)",
        "Módulo 6: Seguridad técnica a bordo, privacidad y discreción en cabinas de negocios"
      ],
      nota: "Para tomar este curso no es requisito indispensable contar con la licencia vigente de Sobrecargo de Aviación (es posible cursarlo por conocimiento general, enriquecimiento extracurricular o gusto personal); sin embargo, ten en cuenta que para desempeñarte profesionalmente como Sobrecargo VIP formal a bordo en territorio nacional, el marco normativo de la AFAC sí exige poseer la licencia de Sobrecargo activa.",
      entrenamiento: "Prácticas reales de montaje de cabina VIP y simulación de servicio de primera clase en taller adaptado.",
      duracion: "8 horas presenciales intensivas",
      paquetes: [],
      image: ejecutivoImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20curso%20de%20Sobrecargo%20Ejecutivo."
    },

    // --- CURSES PERIODICOS PARA PERSONAL DE VUELO ---
    {
      id: "crm",
      title: "CRM",
      tagline: "Crew Resource Management",
      category: 'periodicos',
      categoryLabel: "Curso Periódico para Personal de Vuelo",
      fichaCode: "ICAAS-AD-CRM",
      format: "Teórico presencial interactivo con dinámicas grupales operacionales",
      targetAudience: "Tripulaciones de vuelo activas, egresados de vuelo comercial, oficiales de operaciones y mecánicos que requieran acreditar u optimizar la competencia de CRM conforme a directrices regulatorias de aviación.",
      requirements: [
        "Deseable ser personal técnico aeronáutico o estudiante en curso",
        "Cumplimiento de programas periódicos conforme a requerimientos de seguridad"
      ],
      description: "El programa CRM desarrollado en ICAAS enseña el dominio de habilidades no técnicas fundamentales para prevenir incidentes y reaccionar de forma coordinada, enfocándose en la interacción humana óptima.",
      overviewDescription: "El adiestramiento periódico de Crew Resource Management (Manejo de Recursos de Tripulación) se enfoca en perfeccionar la comunicación asertiva, el liderazgo situacional, el manejo del estrés y la minimización activa del error humano. Estudiarás la dinámica colectiva de cabina mediante casos prácticos que te ayudarán a evitar la cadena de errores antes de que comprometan la seguridad vial.",
      puntosImportantes: [
        "Aplicar técnicas confiables de comunicación y coordinación en el área de trabajo aérea.",
        "Gestionar con éxito los picos de carga de trabajo mediante delegación eficaz.",
        "Mejorar la conciencia situacional compartida de toda la tripulación.",
        "Identificar, contener o mitigar la cadena del error mediante herramientas analíticas estándar.",
        "Aplicar el CRM como el cimiento central de la seguridad operacional activa.",
        "Analizar bitácoras, reportes aeronáuticos y transcripciones de llamadas de voz de cabina."
      ],
      planEstudios: [
        "Módulo 1: Factores Humanos, Error Humano y Modelos de Barreras (SHEL / Queso Suizo)",
        "Módulo 2: Técnicas de Liderazgo, Sinergia Cruzada y Toma de Decisiones en Cabina",
        "Módulo 3: Conciencia Situacional: Detección, Pérdida y Recuperación del Entorno",
        "Módulo 4: Estrés, Fatiga Crónica y de Vuelo (Mitigación Operational en Cabina)",
        "Módulo 5: Casos de Estudio Históricos: El Análisis de las Cajas Negras"
      ],
      entrenamiento: "Análisis de cajas negras y recreación de dinámicas en cabina de vuelo.",
      duracion: "8 horas teórico-prácticas",
      paquetes: [],
      image: genericImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20curso%20de%20CRM."
    },
    {
      id: "cfit",
      title: "CFIT",
      tagline: "Controlled Flight Into Terrain",
      category: 'periodicos',
      categoryLabel: "Curso Periódico para Personal de Vuelo",
      fichaCode: "ICAAS-AD-CFIT",
      format: "Instrucción teórica y simulación táctica en entrenadores de vuelo",
      targetAudience: "Pilotos estudiantiles en fase de instrumentos (IFR), pilotos comerciales de ala fija que requieren actualizar sus conocimientos de prevención de colisiones terrestres bajo normativa vigente.",
      requirements: [
        "Licencia de piloto privado o comercial (estudiante o egresado)"
      ],
      description: "El programa CFIT proporciona al alumno los procedimientos de seguridad crítica necesarios para evitar impactos involuntarios de una aeronave controlable contra los obstáculos terrestres.",
      overviewDescription: "El curso de Vuelo Controlado contra el Terreno (CFIT) proporciona un conocimiento integral de los factores de riesgo físicos y operativos que causan impactos involuntarios en elevaciones geográficas. Integra el funcionamiento de los sistemas satélites de información (GPWS), interpretación fina de cartas instrumentales complejas y maniobras de escape estandarizadas en situaciones críticas.",
      puntosImportantes: [
        "Identificar y analizar los desencadenantes históricos en un accidente operacional CFIT.",
        "Interpretar e integrar alarmas sonoras y visuales avanzadas de sistemas TAWS / GPWS.",
        "Optimizar la navegación instrumental IFR bajo visibilidad severamente reducida (IMC).",
        "Aplicación efectiva de perfil de ascenso técnico máximo con ángulo óptimo.",
        "Prevención de desorientación espacial en áreas montañosas de alta densidad de relieve."
      ],
      planEstudios: [
        "Módulo 1: Anatomía Técnica de los Accidentes CFIT de Gran Escala",
        "Módulo 2: Sistemas a Bordo: GPWS, EGPWS y Sistemas TAWS",
        "Módulo 3: Factores Humanos: Desorientación Espacial y Complacencia Instrumental",
        "Módulo 4: Interpretación de Cartas de Aproximación, Altitudes Mínimas y Corredores Aéreos",
        "Módulo 5: Procedimiento de Escape de Emergencia y Regulación de Ascenso Extremo"
      ],
      entrenamiento: "Maniobras evasivas simuladas en condiciones de visibilidad cero.",
      duracion: "8 horas teórico-prácticas",
      paquetes: [],
      image: genericImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20curso%20de%20CFIT."
    },
    {
      id: "alar",
      title: "ALAR",
      tagline: "Approach & Landing Accident Reduction",
      category: 'periodicos',
      categoryLabel: "Curso Periódico para Personal de Vuelo",
      fichaCode: "ICAAS-AD-ALAR",
      format: "Clases técnicas dinámicas y ejercicios de aproximación estables en cabina de simulación",
      targetAudience: "Pilotos de todos los rangos (estudiantes, privados o de línea aerocomercial) enfocados en blindar la fase de aproximación, descenso y toque final ante contingencias operativas.",
      requirements: [
        "Tener conocimientos de navegación e interpretación de aproximaciones básicas"
      ],
      description: "El programa ALAR tiene como propósito fundamental reducir los índices de siniestralidad en las fases más complejas del vuelo: la aproximación instrumental y el aterrizaje en pista.",
      overviewDescription: "Los mayores rangos de riesgos y accidentes se concentran en las fases de aproximación y toma de contacto en pista. ALAR enseña la estricta aplicación de la Regla de Oro de la Aproximación Estabilizada (altitud, velocidad, empuje, flujos lógicos), identificando oportunamente desvíos climatológicos o técnicos para ordenar un escape inmediato con decisión blindada.",
      puntosImportantes: [
        "Estudio preventivo de factores de error en los umbrales de pista.",
        "La Regla de Aproximación Estabilizada de la Flight Safety Foundation.",
        "Ejecución ágil, segura y blindada de la aproximación frustrada (Go-Around) en segundos.",
        "Definición y comunicación asertiva del rol de monitoreo del Pilot Monitoring (PM)."
      ],
      planEstudios: [
        "Módulo 1: La Problemática Operacional del ALAR a Escala Internacional",
        "Módulo 2: Monitoreo Activo (PM) y Altitudes de Decisión (DA/MDA)",
        "Módulo 3: Definición del Criterio de Estabilización Técnica: 5 Claves Indispensables",
        "Módulo 4: Gestión de Viento Cruzado, Turbulencia de Estela y Pistas de Baja Adherencia",
        "Módulo 5: Toma de Decisiones Técnicas del Go-Around (Teoría de Blindaje de Cabina)"
      ],
      entrenamiento: "Resolución de desestabilizaciones extremas mediante entrenamiento procedimental.",
      duracion: "8 horas",
      paquetes: [],
      image: genericImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20curso%20de%20ALAR."
    },
    {
      id: "hora-de-simulador",
      title: "Entrenador sintético de vuelo",
      tagline: "Entrenamiento de Vuelo Homologado",
      category: 'aficionados',
      categoryLabel: "Simulación & Práctica para Aficionados",
      fichaCode: "ICAAS-SIM-STD",
      format: "Sesión práctica en entrenador sintético de vuelo con Capitán Asesor",
      targetAudience: "Pilotos activos que deseen mantener vigencia de capacidades instrumentales, aspirantes a exámenes de ingreso de aerolínea comercial, o alumnos pilotos en busca de horas prácticas instruidas de alta fidelidad.",
      requirements: [
        "Ser alumno matriculado en escuela de vuelo de aviación o piloto comercial graduado",
        "Programación agendada con anticipación vía coordinación de ICAAS"
      ],
      description: "Acelera y despega en nuestros sofisticados entrenadores sintéticos de vuelo. Experimenta el realismo absoluto con escenarios meteorológicos reales, fallas controladas y planes de vuelo simulados guiados por pilotos asesores de ICAAS.",
      overviewDescription: "Consolida tus reflejos, procedimientos instrumentales IFR y memoria muscular mediante prácticas técnicas de alta concentración guiadas por nuestros capitanes adiestradores en un simulador ágil que reproduce condiciones reales de vuelo en múltiples escenarios aeroportuarios del mundo.",
      puntosImportantes: [
        "Configuración activa de clima extremo: tormentas, vientos cruzados, niebla cerrada.",
        "Familiarización instrumental, radio Navegación y gestión de cartas Jeppesen.",
        "Práctica guiada en situaciones de fallo y contingencias extremas.",
        "Capitanes asesores para guiarte en cada briefing y enriquecer tu aprendizaje."
      ],
      planEstudios: [
        "Fase 1: Pre-flight briefing (Determinación de ruta, aeropuertos alternos y meteoros)",
        "Fase 2: Práctica en cabina simulada: Maniobras, flujos y aproximaciones instrumentales",
        "Fase 3: Gestión de emergencias en ruta: fallos eléctricos, pérdida de motor",
        "Fase 4: Recapitulación detallada (Post-flight debriefing) con diagnóstico técnico"
      ],
      duracion: "Por hora o bloque de adiestramiento",
      paquetes: [
        { label: "Adiestramiento de 1 hora", price: "$1,200 MXN / hr" },
        { label: "Bloque técnico de 5 horas", price: "$1,000 MXN / hr" },
        { label: "Paquete a partir de la 6ta hora", price: "$900 MXN / hr" }
      ],
      image: horaSimuladorImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20los%20paquetes%20de%20horas%20de%20simulador."
    },
    {
      id: "simulador-vr",
      title: "Simulador VR Inmersivo",
      tagline: "Realidad Virtual Next Gen",
      category: 'aficionados',
      categoryLabel: "Simulación & Práctica para Aficionados",
      fichaCode: "ICAAS-SIM-VR",
      format: "Entrenamiento inmersivo con cascos de Realidad Virtual Quest Pro y mandos de interacción 3D",
      targetAudience: "Tanto pilotos estudiantes como entusiastas que deseen afinar la noción de espacialidad, orientación visual de pista, o pilotar interactivamente con visibilidad 3D real de 360 grados.",
      requirements: [
        "Sin restricción de conocimientos específicos de vuelo; apto para todos los niveles de aprendizaje"
      ],
      description: "Sumérgete en la tecnología de entrenamiento inmersivo del futuro. Nuestro simulador con gafas de realidad virtual te transporta directamente a cabinas 3D de alta definición, sintiendo en tiempo real la espacialidad física de los mandos de navegación.",
      overviewDescription: "La tecnología inmersiva de Realidad Virtual representa la frontera del aprendizaje aeronáutico del siglo XXI. El simulador te permite examinar una cabina interactiva en escala real tridimensional (1:1), incrementando un 100% el reconocimiento espacial al ejecutar aproximaciones visuales complejas o identificar rápidamente la localización de instrumentos de cabina.",
      puntosImportantes: [
        "Sensación real de profundidad y 3D en cabina con rastreo ocular y de mano.",
        "Inmersión espacial acelerada ideal para planificar maniobras de tránsito o aproximaciones visuales.",
        "Biblioteca interactiva de diferentes aeronaves en alta resolución estructural.",
        "Taller moderno con guías de orientación en tiempo real de ICAAS Cancún."
      ],
      planEstudios: [
        "Fase 1: Reconocimiento de cabina, flujos operativos en espacio tridimensional",
        "Fase 2: Aproximaciones y maniobras en tránsito visual VFR de alta inmersión",
        "Fase 3: Patrones de tráfico y aproximación a pistas instrumentales con horizonte virtual",
        "Fase 4: Diagnóstico y evaluación técnica de orientación espacial aérea"
      ],
      duracion: "Por hora o bloques de simulación programados",
      paquetes: [
        { label: "1 hora de inmersión VR", price: "$1,400 MXN / hr" },
        { label: "Bloque especial de 5 horas VR", price: "$1,200 MXN / hr" },
        { label: "A partir de la 6ta hora de vuelo VR", price: "$1,000 MXN / hr" }
      ],
      image: simuladorVRImg,
      whatsapp: "https://wa.me/529987510172?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20el%20Simulador%20VR."
    }
  ];

  // Group the lists
  const especialidades = coursesList.filter(c => c.category === 'especializacion');
  const periodicosCursos = coursesList.filter(c => c.category === 'periodicos');
  const aficionadosCursos = coursesList.filter(c => c.category === 'aficionados');

  return (
    <div id={id} className="pt-28 md:pt-36 pb-24 bg-gradient-to-b from-[#0F1115] via-[#161922] to-[#0A0B0D] min-h-screen text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-[#1877F2]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-5xl mx-auto px-6 mb-16 relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-4 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 w-fit">
          <Zap size={14} className="animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Programas de Adiestramiento e Innovación</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-tight mb-6 uppercase">
          Cursos y <span className="text-primary italic">especialización.</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          Expande tus capacidades técnicas, prepárate para los exigentes filtros de reclutamiento de aerolínea comercial, o especialízate en el sector ejecutivo. Brindamos programas con entrenadores sintéticos de última generación en Cancún.
        </p>
      </div>

      {/* SECTION 1: Cursos de Especialización (Rendered FIRST) */}
      <div className="max-w-5xl mx-auto px-6 mb-20 relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/10">
            <Award size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              1. Cursos de Especialización Profesional
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Programas insignia diseñados para liderar en cabinas de aviación comercial y aviación ejecutiva de alta gama.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {especialidades.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-primary bg-[#161a25]/70 hover:border-primary pb-6 shadow-2xl"
            >
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-transparent to-black/35" />
                
                <span className="absolute top-4 right-4 bg-primary text-white text-[8px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase shadow-lg shadow-black/40">
                  ESPECIALIDAD
                </span>

                <span className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-[9px] font-bold text-gray-200 px-3.5 py-1.5 rounded-lg border border-white/5 uppercase tracking-wider">
                  {course.tagline}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-mono tracking-wider bg-white/5 text-gray-300 border border-white/5 px-2 py-0.5 rounded">
                      {course.fichaCode}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white mb-2 group-hover:text-primary transition-colors uppercase">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-gray-400">Duración Estructurada</span>
                    <span className="text-xs font-black text-white flex items-center gap-1.5 mt-0.5">
                      <Clock size={12} className="text-primary" /> {course.duracion}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-primary text-white hover:bg-secondary rounded-xl px-5 py-3 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-md shadow-primary/20"
                  >
                    Ficha Técnica <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Cursos Periódicos para Personal de Vuelo (Rendered SECOND) */}
      <div className="max-w-5xl mx-auto px-6 mb-20 relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <div className="p-2 bg-white/5 rounded-xl text-gray-300 border border-white/5">
            <ClipboardList size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              2. Cursos Periódicos para Personal de Vuelo
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Refuerza el control operativo de tu tripulación con nuestros bloques reglamentarios de adiestramiento aprobados y alineados a la normativa vigente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {periodicosCursos.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-white/15 bg-[#12151d]/40 hover:border-white/35 pb-6 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="low"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-transparent to-black/20" />

                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-[9px] font-bold text-gray-300 px-3 py-1 rounded-md border border-white/5 uppercase tracking-wider">
                  {course.tagline}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-mono tracking-wider bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 rounded">
                      {course.fichaCode}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white mb-2 group-hover:text-primary transition-colors uppercase leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-gray-500">Duración</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                      <Clock size={12} className="text-primary" /> {course.duracion}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-white/10 text-white hover:bg-primary rounded-xl px-4 py-2.5 text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    Detalles <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Para Aficionados a la Aviación (Rendered THIRD) */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <div className="p-2 bg-white/5 rounded-xl text-gray-300 border border-white/5">
            <Plane size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              3. Para Aficionados a la Aviación
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Experimenta la sensación de volar en nuestros modernos simuladores de última generación y Realidad Virtual, ideal para entusiastas y alumnos que deseen horas de práctica libre.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aficionadosCursos.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-white/15 bg-[#12151d]/40 hover:border-white/35 pb-6 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="low"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-transparent to-black/20" />

                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-[9px] font-bold text-gray-300 px-3 py-1 rounded-md border border-white/5 uppercase tracking-wider">
                  {course.tagline}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-mono tracking-wider bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 rounded">
                      {course.fichaCode}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white mb-2 group-hover:text-primary transition-colors uppercase leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-wider text-gray-500">Duración</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                      <Clock size={12} className="text-primary" /> {course.duracion}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-white/10 text-white hover:bg-primary rounded-xl px-4 py-2.5 text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    Detalles <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-transparent relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-black block mb-2">UBICACIÓN ESTRATÉGICA</span>
            <h2 className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter uppercase leading-none">
              Nuestra Sede de <span className="text-primary">Adiestramiento</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-2xl text-center">
              Nuestras instalaciones se ubican en el centro de Cancún con accesibilidad óptima para nuestros alumnos.
            </p>
          </div>

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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-transparent relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-black block mb-2">RESPUESTAS RÁPIDAS</span>
            <h2 className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter uppercase leading-none">
              Preguntas <span className="text-primary">Frecuentes</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-3 text-center">
              Todo lo que necesitas saber sobre nuestros cursos, especializaciones y formatos de adiestramiento.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "¿A quiénes están dirigidos los cursos de especialización de ICAAS?",
                answer: "Están dirigidos tanto a profesionales en activo (sobrecargos, pilotos, oficiales de operaciones) que buscan ascender o actualizarse, como a personas apasionadas sin experiencia previa que deseen iniciar su formación en aviación."
              },
              {
                question: "¿Qué validez oficial tienen estos cursos?",
                answer: "Nuestros cursos están avalados bajo directrices formales por el centro de capacitación ICAAS corporativo. Al concluir exitosamente, recibes una constancia de adiestramiento y diploma que certifican tus nuevas habilidades y potencian de forma directa tu perfil laboral."
              },
              {
                question: "¿Ofrecen capacitación práctica con simuladores?",
                answer: "Sí. Para programas avanzados y técnicos de alta exigencia, contamos con adiestramiento técnico presencial y tecnología de simulación de cabina que reproduce escenarios reales, brindando experiencia de vuelo interactiva."
              },
              {
                question: "¿Cómo puedo inscribirme en un curso de aficionados o especialización?",
                answer: "El proceso es muy sencillo e inmediato. Haz clic en 'Detalles' del curso que capture tu atención, consulta los requisitos de ingreso y presiona el botón de WhatsApp para chatear directamente con un asesor de admisiones de ICAAS, quien resolverá tus dudas e iniciará tu registro."
              }
            ].map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-[#12151d]/40 rounded-2xl border-2 border-white/15 overflow-hidden shadow-md transition-all duration-300 hover:border-white/25"
                >
                  <button
                    onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 font-light text-left">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Immersive technical "Ficha de Información" Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedCourse(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#141720] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
            >
              
              {/* Technical Seal / Accent Header */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary z-20" />

              {/* Close Button Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 z-30 bg-black/60 hover:bg-black/90 text-white/90 hover:text-white p-2.5 rounded-full transition-all border border-white/10"
                aria-label="Cerrar Ficha Técnica"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto flex-grow custom-scrollbar">
                
                {/* Hero section inside modal representing official document header */}
                <div className="relative h-56 sm:h-72 bg-neutral-900">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141720] via-[#141720]/50 to-black/40" />
                  
                  {/* Ficha Stamp Ribbon */}
                  <div className="absolute top-6 left-6 flex flex-col gap-1 text-center">
                    <div className="flex gap-2 items-center">
                      <span className="bg-primary/95 text-white text-[8px] font-black tracking-[0.2em] px-3.5 py-1.5 rounded-lg border border-primary/20 uppercase">
                        {selectedCourse.categoryLabel}
                      </span>
                      <span className="bg-black/60 border border-white/10 text-[8px] font-mono text-gray-300 px-2.5 py-1.5 rounded-lg font-bold">
                        REG: {selectedCourse.fichaCode}
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 pr-12 text-center w-[calc(100%-48px)] flex flex-col items-center">
                    <p className="text-primary font-mono text-xs font-black tracking-[0.1em] mb-1 uppercase">Ficha de Información Técnica</p>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                      {selectedCourse.title}
                    </h2>
                  </div>
                </div>

                {/* Info and content (Technical dossier representation) */}
                <div className="p-6 sm:p-8 space-y-8 text-center">
                  
                  {/* Quick stats board */}
                  <div className="bg-[#11131a] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-center text-center">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-gray-500 block">Duración</span>
                      <span className="text-sm font-black text-white flex items-center justify-center gap-1.5 mt-0.5">
                        <Clock size={14} className="text-primary shrink-0" /> {selectedCourse.duracion}
                      </span>
                    </div>
                  </div>

                  {/* Main description section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left detailed narrative (2 cols) */}
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen size={16} className="text-primary" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Descripción del Programa</h4>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          {selectedCourse.overviewDescription}
                        </p>
                      </div>

                      {/* Course target audience */}
                      <div className="bg-[#12141c] rounded-2xl p-5 border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={16} className="text-[#1877F2]" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1877F2]">Perfil Recomendado / Dirigido a</h4>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {selectedCourse.targetAudience}
                        </p>
                      </div>
                    </div>

                    {/* Right core requisites (1 col) */}
                    <div className="space-y-6">
                      <div className="bg-[#181a24] rounded-2xl p-5 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-primary/5 rounded-full blur-[30px] pointer-events-none" />
                        <div className="flex items-center gap-2 mb-3">
                          <ShieldAlert size={16} className="text-orange-400" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">Requisitos de Admisión</h4>
                        </div>
                        <ul className="space-y-3">
                          {selectedCourse.requirements.map((req, index) => (
                            <li key={index} className="flex gap-2 items-start text-xs text-gray-300 leading-tight">
                              <span className="text-orange-400 mt-0.5">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>

                  {/* Syllabus & Curricular layout */}
                  {selectedCourse.planEstudios.length > 0 && selectedCourse.category !== 'aficionados' && (
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap size={18} className="text-primary" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Plan de Estudios & Estructura Curricular</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedCourse.planEstudios.map((tema, idx) => (
                          <div key={idx} className="flex gap-3.5 items-center bg-black/30 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <span className="text-primary font-mono text-[10px] sm:text-xs font-black italic">
                              / {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </span>
                            <span className="text-xs font-bold text-gray-200 leading-tight">{tema}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What you learn grid */}
                  {selectedCourse.puntosImportantes.length > 0 && selectedCourse.category !== 'aficionados' && (
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle size={18} className="text-emerald-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Objetivos Estratégicos de Aprendizaje</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {selectedCourse.puntosImportantes.map((point, index) => (
                          <div key={index} className="flex gap-3 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-300 leading-snug">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Simulator training info block */}
                  {selectedCourse.entrenamiento && (
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity size={18} className="text-blue-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Perfil de Prácticas y Simulación</h4>
                      </div>
                      <div className="bg-[#12141c] border border-blue-400/20 p-5 rounded-2xl">
                        <p className="text-xs text-gray-300 leading-relaxed italic">
                          " {selectedCourse.entrenamiento} "
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Packages and prices if available */}
                  {selectedCourse.paquetes && selectedCourse.paquetes.length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-4">
                        <Layers size={18} className="text-[#1877F2]" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1877F2]">Esquema Comercial de Inversión</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {selectedCourse.paquetes.map((p, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-[#1c212f]/80 to-[#12141c]/90 p-4 rounded-2xl border border-white/5 text-center relative overflow-hidden group">
                            <span className="text-[8px] uppercase tracking-widest text-gray-400 block mb-1.5 font-bold">{p.label}</span>
                            <span className="text-lg font-black text-white block group-hover:text-primary transition-colors">{p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes / Avisos de Ficha Técnica */}
                  {selectedCourse.nota && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5 flex gap-4">
                      <HelpCircle className="text-orange-400 size-6 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest block mb-1.5">Aclaración Normativa</span>
                        <p className="text-gray-300 text-xs leading-relaxed">{selectedCourse.nota}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Sticky bottom CTA actions in modal representing official document footer actions */}
              <div className="p-6 border-t border-white/10 bg-[#10121a] flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
                <div className="flex gap-4">
                  <div className="flex flex-col text-center w-full">
                    <span className="text-[8px] uppercase tracking-widest text-gray-400">Soporte Técnico de Admisiones</span>
                    <span className="text-xs font-black text-white flex items-center gap-1.5 mt-0.5">
                      <BadgeInfo size={12} className="text-primary" /> Ficha Informativa Oficial {selectedCourse.fichaCode}
                    </span>
                  </div>
                </div>

                <div className="flex w-full sm:w-auto gap-3">
                  <a
                    href={selectedCourse.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow sm:flex-grow-0 bg-[#25D366] text-white font-black uppercase tracking-widest text-[9px] px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    <MessageCircle size={14} fill="currentColor" /> Descargar Ficha PDF / Cotizar en WhatsApp
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
