/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

import Home from './pages/Home';
import CareerLanding from './pages/CareerLanding';
import Cursos from './pages/Cursos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blog from './pages/Blog';

import { initGA, trackPageView } from './lib/analytics';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      initGA(GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      trackPageView(GA_MEASUREMENT_ID, location.pathname + location.search);
    }
  }, [location]);

  return null;
}

// Elegant minimal loading bar/state matching Swiss modern aesthetic
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-neutral flex flex-col items-center justify-center gap-4 select-none">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary/20 animate-ping opacity-60"></span>
        <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-primary animate-spin relative z-10" />
      </div>
      <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-gray-500">ICAAS Adiestramiento</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <div className="flex flex-col min-h-screen">
        <Navbar id="nav-main" />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home id="page-home" />} />
              <Route path="/sobrecargo" element={<CareerLanding careerKey="sobrecargo" />} />
              <Route path="/oficial" element={<CareerLanding careerKey="oficial" />} />
              <Route path="/cursos" element={<Cursos id="page-cursos" />} />
              <Route path="/nosotros" element={<Nosotros id="page-nosotros" />} />
              <Route path="/contacto" element={<Contacto id="page-contacto" />} />
              <Route path="/blog" element={<Blog id="page-blog" isStandalone={true} />} />
              <Route path="/blog/:slug" element={<Blog id="page-blog-post" isStandalone={true} />} />
              <Route path="*" element={<Home id="page-home" />} />
            </Routes>
          </Suspense>
        </main>
        <FloatingButtons />
        <Footer id="footer-main" />
      </div>
    </Router>
  );
}
