import React from 'react';
import SEO from './SEO';
import { PersonJsonLd, WebsiteJsonLd } from './JsonLd';
import { Hero } from './Hero';
import { TechStack } from './TechStack';
import About from './About';
import { Skills } from './Skills';
import { Services } from './Services';
import { Projects } from './Projects';
import { Contact } from './Contact';

export default function Home() {
  const personData = {
    name: 'MasBodo',
    alternateName: 'Priyambodo',
    description:
      'Professional Fullstack Web Developer & SysAdmin specializing in scalable backend systems, secure server environments, and optimized database architectures.',
    jobTitle: 'Fullstack Developer & SysAdmin',
    sameAs: [
      'https://github.com/maspriyambodo',
      'https://www.linkedin.com/in/priyambodoss',
      'https://masbodo.dev',
    ],
    address: {
      addressCountry: 'Indonesia',
    },
    contactPoint: {
      email: 'maspriyambodo@gmail.com',
      contactType: 'Professional',
    },
  };

  const websiteData = {
    name: 'MasBodo Portfolio',
    url: 'https://masbodo.dev',
    description:
      'Portfolio website of MasBodo, a Fullstack Developer and SysAdmin specializing in modern web technologies and system administration.',
    inLanguage: 'en-US',
    potentialAction: {
      target: 'https://masbodo.dev/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEO
        title="MasBodo - Fullstack Developer & SysAdmin | Portfolio"
        description="Professional Fullstack Web Developer & SysAdmin specializing in scalable backend systems, secure server environments, and optimized database architectures. Expert in React, Laravel, Golang."
        keywords="fullstack developer, web developer, sysadmin, backend developer, devops, react, laravel, golang, portfolio"
        canonical="/"
      />
      <PersonJsonLd data={personData} />
      <WebsiteJsonLd data={websiteData} />
      <Hero />
      <TechStack />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}
