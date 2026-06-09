import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export function useSEO({
  title,
  description,
  path = '',
  ogType = 'website',
  ogImage = '/logo.png',
  structuredData
}: SEOProps) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // 2. Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // 4. Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // 5. Open Graph Type
    let ogT = document.querySelector('meta[property="og:type"]');
    if (!ogT) {
      ogT = document.createElement('meta');
      ogT.setAttribute('property', 'og:type');
      document.head.appendChild(ogT);
    }
    ogT.setAttribute('content', ogType);

    // 6. Open Graph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`;
    ogImg.setAttribute('content', fullOgImage);

    // 7. Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const baseUrl = 'https://vuela-caas.com';
    canonical.setAttribute('href', `${baseUrl}${cleanPath}`);

    // 8. Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', `${baseUrl}${cleanPath}`);

    // 9. JSON-LD Structured Data Tag
    const existingScript = document.getElementById('json-ld-seo-dynamic');
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'json-ld-seo-dynamic';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup structured data script on route change
      const script = document.getElementById('json-ld-seo-dynamic');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, path, ogType, ogImage, JSON.stringify(structuredData)]);
}
