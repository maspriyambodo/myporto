import React from 'react';
import { Section } from './UI';

const tools = [
  { name: 'Laravel', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  { name: 'Golang', color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'React', color: 'from-cyan-400 to-blue-500', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20' },
  { name: 'Docker', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  {
    name: 'Nginx',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  { name: 'Linux', color: 'from-gray-700 to-gray-900', bgColor: 'bg-gray-50 dark:bg-gray-800' },
  { name: 'MySQL', color: 'from-blue-600 to-blue-800', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  {
    name: 'PostgreSQL',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
];

export const TechStack: React.FC = () => {
  return (
    <Section
      id="techstack"
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12"
    >
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
          Trusted Technologies
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Tools and frameworks I work with daily</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {tools.map((tool, index) => (
          <div
            key={tool.name}
            className={`group relative ${tool.bgColor} px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient Background on Hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}
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
