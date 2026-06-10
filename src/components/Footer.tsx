import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Plane, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/images/regenerated_image_1777580804672_opt.png';

export default function Footer({ id }: { id: string }) {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <footer id={id} className="bg-secondary text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-4 gap-12 text-left items-start">
        <div className="col-span-1 sm:col-span-1">
          <a href="/#inicio" className="flex items-center justify-start gap-3 mb-6">
            <img 
              src={logoImg} 
              alt="ICAAS Logo" 
              className="w-12 h-12 object-contain"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="leading-none text-left">
              <span className="text-xl font-display font-bold tracking-tight block">ICAAS</span>
              <span className="text-[8px] text-primary uppercase tracking-widest font-black">Escuela de aviación</span>
            </div>
          </a>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Forjando profesionales con estándares internacionales en México. Despega tu carrera hoy en la mejor escuela de aviación en Cancún.
          </p>
          <div className="flex gap-4 justify-start">
            <a href="https://www.facebook.com/share/1GbFY4fk4J/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/icaascancun?igsh=MWRnN2F4aHcyMWUzcw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="https://maps.app.goo.gl/hC8aT9iViyz498NV7" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Google Maps"><MapPin size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white text-left">Políticas de Privacidad</h4>
          <p className="text-gray-400 text-xs leading-relaxed mb-4 text-left">
            Comprometidos con la protección de tus datos. Nuestra política garantiza el manejo ético y seguro de tu información personal.
          </p>
          <div className="text-left font-sans">
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider cursor-pointer"
            >
              Leer políticas completas
            </button>
          </div>
        </div>

        <div className="sm:justify-self-start text-left">
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li className="text-white font-extrabold text-[10px] uppercase tracking-wider mb-1 text-left">Carreras</li>
            <li><Link to="/sobrecargo" className="hover:text-primary transition-colors text-xs flex items-center justify-start gap-1">Sobrecargo de Aviación</Link></li>
            <li><Link to="/oficial" className="hover:text-primary transition-colors text-xs flex items-center justify-start gap-1">Oficial de Operaciones</Link></li>
            <li className="text-white font-extrabold text-[10px] uppercase tracking-wider mt-4 mb-1 text-left">Secciones</li>
            <li><Link to="/cursos" className="hover:text-white transition-colors">Cursos</Link></li>
            <li><Link to="/nosotros" className="hover:text-white transition-colors">Beneficios</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <ul className="flex flex-col gap-4 text-gray-400 text-sm items-start text-left">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-primary shrink-0" />
              <span>Av. Bonampak, Cancun, QR 77500, México</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-primary shrink-0" />
              <span>+52 998 751 0172</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-primary shrink-0" />
              <span>hola@vuela-caas.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800 text-left text-gray-500 text-xs tracking-widest uppercase flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} ICAAS AVIACIÓN S.A.S. de C.V. TODOS LOS DERECHOS RESERVADOS.</span>
        <span className="text-primary font-bold">PERMISO AFAC F-213</span>
      </div>

      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-secondary border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-neutral/10">
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">Políticas de Privacidad</h3>
                <button 
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                  <p className="mb-4">
                    De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, **ICAAS Centro de Adiestramiento Aeronáutico del Sureste** pone a su disposición este aviso:
                  </p>
                  
                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">1. Finalidad del tratamiento</h4>
                  <p className="mb-4">
                    Los datos personales recopilados serán utilizados exclusivamente para gestionar su inscripción, seguimiento académico, trámites ante la AFAC y comunicación de servicios relacionados con su formación aeronáutica.
                  </p>

                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">2. Datos Recabados</h4>
                  <p className="mb-4">
                    Podemos solicitar nombre completo, identificación oficial, CURP, comprobante de domicilio, datos de contacto y antecedentes educativos necesarios para el cumplimiento de los estándares de formación de pilotos y personal técnico.
                  </p>

                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">3. Seguridad</h4>
                  <p className="mb-4">
                    Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración o uso no autorizado.
                  </p>

                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">4. Derechos ARCO</h4>
                  <p className="mb-4">
                    Usted tiene derecho al **Acceso, Rectificación, Cancelación y Oposición** de sus datos. Para ejercerlos, puede contactarnos en **hola@vuela-caas.com** o directamente en nuestras instalaciones en Cancún.
                  </p>

                  <p className="mt-8 pt-6 border-t border-gray-800 text-[10px] uppercase tracking-widest color-gray-500">
                    Última actualización: Mayo 2026
                  </p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-800 bg-neutral/5 flex justify-end">
                <button 
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-bold text-sm uppercase transition-all tracking-wider"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
