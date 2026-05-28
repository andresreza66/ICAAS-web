/**
 * Simple and production-ready Google Analytics 4 (GA4) integration for ICAAS.
 * Automatically initializes and tracks pageviews/events if VITE_GA_MEASUREMENT_ID is configured in the environment.
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function initGA(measurementId: string) {
  if (!measurementId || typeof window === 'undefined') return;

  // Prevent duplicate load
  if (window.gtag) return;

  // Insert Google Analytics Script Tag
  const scriptTrack = document.createElement('script');
  scriptTrack.async = true;
  scriptTrack.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(scriptTrack);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: true
  });
  
  console.log(`[ICAAS Analytics] Google Analytics 4 initialized successfully with tag: ${measurementId}`);
}

export function trackPageView(measurementId: string, path: string) {
  if (typeof window !== 'undefined' && window.gtag && measurementId) {
    window.gtag('config', measurementId, {
      page_path: path,
    });
    console.log(`[ICAAS Analytics] Pageview tracked: ${path}`);
  }
}

export function trackEvent(category: string, action: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log(`[ICAAS Analytics] Custom event tracked -> Category: ${category}, Action: ${action}, Label: ${label}`);
  }
}
