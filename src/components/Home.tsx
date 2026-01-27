import React from 'react';
import { Hero } from './Hero';
import { TechStack } from './TechStack';
import { About } from './About';
import { Skills } from './Skills';
import { Services } from './Services';
import { Projects } from './Projects';
import { Contact } from './Contact';

export default function Home() {
  return (
    <>
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
