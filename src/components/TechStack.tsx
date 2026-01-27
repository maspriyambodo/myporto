import React from 'react';
import { Section } from './UI';

const tools = [
  { name: 'Laravel', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50' },
  { name: 'Golang', color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50' },
  { name: 'React', color: 'from-cyan-400 to-blue-500', bgColor: 'bg-cyan-50' },
  { name: 'Docker', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-50' },
  {
    name: 'Nginx',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  { name: 'Linux', color: 'from-gray-700 to-gray-900', bgColor: 'bg-gray-50' },
  { name: 'MySQL', color: 'from-blue-600 to-blue-800', bgColor: 'bg-blue-50' },
  {
    name: 'PostgreSQL',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

export const TechStack: React.FC = () => {
  return (
    <Section
      id="tech-stack"
      className="bg-gradient-to-b from-gray-50 to-white py-12"
    >
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest mb-2">
          Trusted Technologies
        </h3>
        <p className="text-gray-600">Tools and frameworks I work with daily</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {tools.map((tool, index) => (
          <div
            key={tool.name}
            className={`group relative ${tool.bgColor} px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient Background on Hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
            ></div>

            <div className="relative z-10 flex items-center gap-3">
              {/* Icon/Badge */}
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-br ${tool.color} group-hover:scale-150 transition-transform duration-300`}
              ></div>

              {/* Tool Name */}
              <span
                className={`text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r ${tool.color} bg-clip-text text-transparent`}
              >
                {tool.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
