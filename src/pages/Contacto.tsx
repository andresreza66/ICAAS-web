import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import {   Mail, Phone, Send, Info, CheckCircle2, MapPin, Clock, HelpCircle, 
  MessageSquare, Facebook, Instagram, MessageCircle, AlertCircle
} from 'lucide-react';
import { LazyMap } from '../components/LazyMap';
import { trackEvent } from '../lib/analytics';

export default function Contacto({ id }: { id: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useSEO({
    title: "Admisiones y Contacto Directo de Aviación | ICAAS Cancún",
    description: "Ponte en contacto con ICAAS Aviación. Inicia tu proceso de inscripción para Sobrecargo u Oficial de Operaciones en Cancún. Llámanos o envíanos un mensaje.",
    path: "/contacto",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Página de Contacto y Admisiones | ICAAS Aviación",
      "description": "Formularios de contacto, ubicación, teléfonos y proceso de registro para la escuela de aviación ICAAS Cancún.",
      "url": "https://vuela-caas.com/contacto",
      "mainEntity": {
        "@type": "EducationalOrganization",
        "name": "ICAAS Aviación",
        "telephone": "+52-998-321-4712",
        "email": "hola@vuela-caas.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Sayil, Smz 6, Central Sayil, Ofna 303",
          "addressLocality": "Cancún",
          "addressRegion": "Quintana Roo",
          "postalCode": "77503",
          "addressCountry": "MX"
        }
      }
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

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
          console.log("Petición enviada correctamente (modo contacto landing)");
        } catch (fetchError) {
          console.error("Error crítico en fetch:", fetchError);
        }
      } else {
        console.warn("VITE_GOOGLE_SHEETS_URL no está configurada. Simulación completada.");
        console.log("Simulación de envío:", { nombre, correo, celular, curso, mensaje });
      }
      
      // Track conversion event in Google Analytics
      trackEvent('lead_form', 'submit_contacto', curso);
      
      setSubmitSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error en el envío:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={id} className="pt-28 md:pt-36 pb-20 bg-gradient-to-b from-[#0F1115] via-[#161922] to-[#0A0B0D] min-h-screen text-white relative overflow-hidden flex flex-col justify-center">
      
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[350px] h-[350px] bg-[#1877F2]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-4 bg-primary/10 text-primary border border-primary/15 rounded-full px-4 py-1.5 w-fit mx-auto">
            <MessageSquare size={14} className="text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Centro de Atención y Matrícula</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none mb-6">
            Escríbenos <span className="text-primary italic">& Despega.</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            ¿Tienes dudas sobre los costos, inscripciones o fechas de inicio? Rellena el formulario oficial o agenda una cita física directa en nuestras instalaciones de Cancún.
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
                href="https://maps.app.goo.gl/TPREQbzwRfBHstkQ6?g_st=ic"
              />
           </div>

           <div className="lg:col-span-2 bg-[#12151d]/40 p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-md border-2 border-white/15">
              <h3 className="text-2xl font-black mb-8 italic text-center text-white">Inicia tu Solicitud</h3>
              {submitSuccess ? (
                <div className="bg-primary/10 border border-primary/20 text-primary p-8 rounded-3xl text-center">
                  <CheckCircle2 size={48} className="mx-auto mb-4 text-primary" />
                  <h4 className="text-2xl font-black mb-2 tracking-tight">¡Solicitud Enviada!</h4>
                  <p className="font-light text-sm">Nos pondremos en contacto contigo de inmediato.</p>
                </div>
              ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-1.5 md:col-span-1">
                       <label className="text-[9px] font-black text-gray-400 tracking-widest uppercase px-1">Nombre Completo *</label>
                       <input type="text" name="nombre" placeholder="Ej. Juan Pérez" className="bg-[#161a25]/65 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors" required />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-1">
                       <label className="text-[9px] font-black text-gray-400 tracking-widest uppercase px-1">Correo Electrónico *</label>
                       <input type="email" name="correo" placeholder="juan@ejemplo.com" className="bg-[#161a25]/65 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors" required />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-1">
                       <label className="text-[9px] font-black text-gray-400 tracking-widest uppercase px-1">Celular / WhatsApp *</label>
                       <input type="tel" name="celular" placeholder="998 000 0000" className="bg-[#161a25]/65 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors" required />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-1">
                       <label className="text-[9px] font-black text-gray-400 tracking-widest uppercase px-1">Carrera o Curso *</label>
                       <select name="curso" className="bg-[#161a25]/65 border border-white/10 rounded-xl px-4 py-3.5 text-sm appearance-none text-white focus:outline-none focus:border-primary transition-colors cursor-pointer" required defaultValue="">
                          <option value="" disabled className="text-gray-500">Selecciona una opción</option>
                          <optgroup label="Carreras" className="bg-[#161a25] text-white font-bold">
                            <option value="Sobrecargo de Aviación" className="font-normal">Sobrecargo de Aviación</option>
                            <option value="Oficial de Operaciones" className="font-normal">Oficial de Operaciones</option>
                          </optgroup>
                          <optgroup label="Cursos" className="bg-[#161a25] text-white font-bold">
                            <option value="CFIT" className="font-normal">CFIT</option>
                            <option value="ALAR" className="font-normal">ALAR</option>
                            <option value="CRM" className="font-normal">CRM</option>
                            <option value="Introducción al A320" className="font-normal">Introducción al A320</option>
                            <option value="Sobrecargo Ejecutivo" className="font-normal">Sobrecargo Ejecutivo</option>
                            <option value="Simulador VR" className="font-normal">Simulador VR</option>
                            <option value="Hora de Simulador" className="font-normal">Hora de Simulador</option>
                          </optgroup>
                       </select>
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                       <label className="text-[9px] font-black text-gray-400 tracking-widest uppercase px-1">Mensaje Adicional</label>
                       <textarea name="mensaje" rows={3} placeholder="Cuéntanos tus dudas..." className="bg-[#161a25]/65 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none" />
                    </div>
                    <div className="md:col-span-2">
                       <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-2">
                          {isSubmitting ? 'Procesando...' : (
                            <>Enviar Solicitud <Send size={14} /></>
                          )}
                       </button>
                    </div>
                 </form>
              )}
           </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 w-full relative z-10">
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
                     <a href="https://maps.app.goo.gl/TPREQbzwRfBHstkQ6?g_st=ic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white font-black text-[10px] tracking-widest uppercase hover:text-primary transition-colors">
                        <MapPin size={16} className="text-primary" />
                        Pabellón Bonampak, Cancún
                     </a>
                     <a 
                       href="https://maps.app.goo.gl/TPREQbzwRfBHstkQ6?g_st=ic" 
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

      </div>
    </div>
  );
}

function ContactInfoCard({ icon, title, detail, sub, href }: { icon: React.ReactNode, title: string, detail: string, sub: string, href?: string }) {
  const content = (
    <div className="bg-[#12151d]/60 p-4 lg:p-5 rounded-2xl md:rounded-3xl flex gap-3 lg:gap-4 items-center shadow-lg border-2 border-white/15 hover:border-primary/50 transition-all group h-full">
       <div className="size-10 lg:size-11 bg-white/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
          {icon}
       </div>
       <div className="text-left">
          <h4 className="text-[7px] uppercase tracking-widest font-black text-gray-400 mb-0.5">{title}</h4>
          <p className="text-xs lg:text-sm font-bold text-white leading-tight mb-0.5 group-hover:text-primary transition-colors">{detail}</p>
          <p className="text-[8px] text-gray-400 leading-none">{sub}</p>
       </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block w-full">
        {content}
      </a>
    );
  }

  return content;
}
