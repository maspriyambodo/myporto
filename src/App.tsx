import React from 'react';
import { Navbar, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
