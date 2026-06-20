import React, { useEffect } from 'react';

const SEO = ({
  title,
  description = "CareerLens — AI-powered career guidance platform. Navigate your career with precision intelligence through personalized assessments, roadmaps, and matching.",
  canonical,
  ogType = 'website',
  ogImage = 'https://careerlens.ai/og-image.png',
  schema,
}) => {
  useEffect(() => {
    // 1. Dynamic Document Title
    const finalTitle = title ? `${title} | CareerLens` : 'CareerLens | AI Career Agent';
    document.title = finalTitle;

    // 2. Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Canonical Link
    const finalCanonical = canonical || window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

    // 4. Open Graph Meta Tags
    const ogTags = {
      'og:title': finalTitle,
      'og:description': description,
      'og:type': ogType,
      'og:image': ogImage,
      'og:url': finalCanonical,
      'og:site_name': 'CareerLens',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 5. Twitter Card Meta Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': finalTitle,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 6. Schema.org Structured Data
    let schemaScript = document.getElementById('careerlens-schema-ld');
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'careerlens-schema-ld';
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Clean up Schema script on unmount
      const existingSchema = document.getElementById('careerlens-schema-ld');
      if (existingSchema) {
        existingSchema.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, schema]);

  return null;
};

export default SEO;
