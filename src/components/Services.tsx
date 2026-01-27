import React from 'react';
import { Section, Card } from './UI';
import { services } from '../utils/data';
import { Server, Code, Database, ArrowRight } from 'lucide-react';

const iconMap: Record<string, any> = {
  Server: Server,
  Code: Code,
  Database: Database,
};

const serviceColors: Record<number, string> = {
  0: 'from-blue-500 to-blue-600',
  1: 'from-green-500 to-emerald-600',
  2: 'from-purple-500 to-violet-600',
};

export const Services: React.FC = () => {
  return (
    <Section
      id="services"
      title="Services"
      subtitle="Specialized freelance services tailored for modern web applications and infrastructure."
      dark
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon] || Code;
          const colorClass =
            serviceColors[index] || 'from-blue-500 to-blue-600';

          return (
            <div
              key={service.title}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Decorative Circle */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colorClass} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700`}
              ></div>

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex p-4 bg-gradient-to-br ${colorClass} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <Icon className="text-white" size={32} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
