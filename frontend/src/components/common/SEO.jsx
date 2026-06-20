import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogType = 'website', 
  ogImage = 'https://cs-studio.in/preview-cert.svg', 
  twitterCard = 'summary_large_image',
  schemaData = null 
}) => {
  const location = useLocation();
  const currentUrl = canonicalUrl || `https://cs-studio.in${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = `${title} | CS Studio`;
    } else {
      document.title = 'CS Studio';
    }

    // Helper to set meta tags
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // 2. Update Description
    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
    }

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'content', title || 'CS Studio');
    if (description) setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', currentUrl);
    setMetaTag('meta[property="og:type"]', 'content', ogType);
    if (ogImage) setMetaTag('meta[property="og:image"]', 'content', ogImage);

    // 4. Twitter Tags
    setMetaTag('meta[name="twitter:card"]', 'content', twitterCard);
    setMetaTag('meta[name="twitter:title"]', 'content', title || 'CS Studio');
    if (description) setMetaTag('meta[name="twitter:description"]', 'content', description);
    if (ogImage) setMetaTag('meta[name="twitter:image"]', 'content', ogImage);

    // 5. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // 6. Schema.org JSON-LD
    let scriptSchema = document.querySelector('script[id="schema-org"]');
    if (schemaData) {
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.setAttribute('type', 'application/ld+json');
        scriptSchema.setAttribute('id', 'schema-org');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schemaData);
    } else if (scriptSchema) {
      scriptSchema.remove();
    }

  }, [title, description, currentUrl, ogType, ogImage, twitterCard, schemaData]);

  return null;
};

export default SEO;
