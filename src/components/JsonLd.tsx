import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PersonSchema {
  name: string;
  alternateName?: string;
  description: string;
  image?: string;
  sameAs?: string[];
  jobTitle?: string;
  worksFor?: {
    name: string;
    url?: string;
  };
  address?: {
    addressCountry: string;
    addressRegion?: string;
    addressLocality?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
}

interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
}

interface WebsiteSchema {
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  potentialAction?: {
    target: string;
    'query-input'?: string;
  };
}

interface BreadcrumbListSchema {
  itemListElement: Array<{
    position: number;
    name: string;
    item: string;
  }>;
}

interface JsonLdProps {
  type: 'Person' | 'Organization' | 'WebSite' | 'BreadcrumbList';
  data: PersonSchema | OrganizationSchema | WebsiteSchema | BreadcrumbListSchema;
}

const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  );
};

// Predefined schemas for common use cases
export const PersonJsonLd: React.FC<{ data: PersonSchema }> = ({ data }) => (
  <JsonLd type="Person" data={data} />
);

export const OrganizationJsonLd: React.FC<{ data: OrganizationSchema }> = ({ data }) => (
  <JsonLd type="Organization" data={data} />
);

export const WebsiteJsonLd: React.FC<{ data: WebsiteSchema }> = ({ data }) => (
  <JsonLd type="WebSite" data={data} />
);

export const BreadcrumbJsonLd: React.FC<{ data: BreadcrumbListSchema }> = ({ data }) => (
  <JsonLd type="BreadcrumbList" data={data} />
);

export default JsonLd;