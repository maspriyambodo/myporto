import React from 'react';
import { Section, Card } from './UI';
import { skills } from '../utils/data';
import { Code, Database, Server, Wrench } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Frontend: Code,
  Backend: Server,
  Database: Database,
  DevOps: Wrench,
};

const categoryColors: Record<string, string> = {
  Frontend: 'from-blue-500 to-blue-600',
  Backend: 'from-green-500 to-emerald-600',
  Database: 'from-purple-500 to-violet-600',
  DevOps: 'from-orange-500 to-red-600',
};

export const Skills: React.FC = () => {
  return (
    <Section
      id="skills"
      title="Technical Skills"
      subtitle="A comprehensive overview of my technical expertise across the full stack and infrastructure."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skillGroup, index) => {
          const Icon = categoryIcons[skillGroup.category] || Code;
          const colorClass =
            categoryColors[skillGroup.category] || 'from-blue-500 to-blue-600';

          return (
            <div
              key={skillGroup.category}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex p-3 bg-gradient-to-br ${colorClass} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="text-white" size={28} />
                </div>

                {/* Category Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors">
                  {skillGroup.category}
                </h3>

                {/* Skills List */}
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                      style={{
                        animationDelay: `${index * 0.1 + skillIndex * 0.05}s`,
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass} group-hover:scale-150 transition-transform duration-300`}
                      />
                      <span className="font-medium text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
