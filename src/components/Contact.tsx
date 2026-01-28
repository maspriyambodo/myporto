import React from 'react';
import { Section, Card, Button } from './UI';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (This is a dummy form)');
  };

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!"
      className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Let's Build Something{' '}
                <span className="gradient-text-blue">Amazing</span> Together
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:hello@example.com"
                className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    maspriyambodo@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/priyambodoss/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Linkedin size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    LinkedIn
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    linkedin.com/in/priyambodoss
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/maspriyambodo/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Github size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    GitHub
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    github.com/maspriyambodo
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-xl animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 dark:hover:border-gray-500"
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none hover:border-gray-300 dark:hover:border-gray-500"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <Button type="submit" className="w-full gap-2 shadow-xl">
                <Send size={18} /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
