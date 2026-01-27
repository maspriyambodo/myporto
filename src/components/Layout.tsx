import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Github, Linkedin, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3 border-b border-gray-100'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="#"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900 group"
        >
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Terminal className="text-white" size={20} />
          </div>
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dev<span className="gradient-text-blue">Ops</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 py-6 px-4 flex flex-col gap-4 shadow-2xl animate-slide-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-semibold text-gray-600 hover:text-blue-600 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-bold rounded-xl hover:shadow-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 border-t border-gray-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Terminal className="text-white" size={24} />
              </div>
              <span>
                Dev<span className="text-blue-400">Ops</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Building scalable, secure, and optimized digital infrastructure
              for modern businesses.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DevOps Portfolio. All rights reserved.
          </div>
          <div className="text-gray-500 text-sm">
            Made with <span className="text-red-500">❤</span> using React &
            Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
