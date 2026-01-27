import React from 'react';
import { Button } from './UI';
import { ArrowRight, Shield, Database, Server, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-lg mb-8 animate-slide-down">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              Available for Freelance Projects
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-6 animate-slide-up">
            Building <span className="gradient-text-blue">Scalable</span>,{' '}
            <span className="gradient-text-blue">Secure</span> &{' '}
            <span className="gradient-text-blue">Optimized</span> Digital
            Infrastructure.
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Fullstack Web Developer & SysAdmin specializing in high-performance
            backend systems, hardened server environments, and optimized
            database architectures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Button
              size="lg"
              className="gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Hire Me <ArrowRight size={20} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View Projects
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-hover">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                <Server size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Scalable Backend
              </h3>
              <p className="text-gray-600 text-sm">
                High-performance architecture
              </p>
            </div>

            <div
              className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-hover"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Secure Servers
              </h3>
              <p className="text-gray-600 text-sm">Enterprise-grade security</p>
            </div>

            <div
              className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-hover"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl text-white inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                <Database size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Optimized DB
              </h3>
              <p className="text-gray-600 text-sm">Lightning-fast queries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    </section>
  );
};
