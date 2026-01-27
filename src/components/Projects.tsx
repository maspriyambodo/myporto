import React from 'react';
import { Section, Card, Button } from './UI';
import { projects } from '../utils/data';
import { ExternalLink, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="A selection of my recent work, focusing on complex problem-solving and technical excellence."
      className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="space-y-20">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`group flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Placeholder for project image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                      <ExternalLink className="text-white" size={32} />
                    </div>
                    <span className="text-lg font-bold text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg uppercase tracking-wider border border-blue-200 dark:border-blue-800 hover:scale-110 transition-transform duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                  <h4 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Problem
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
                  <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Solution
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
                  <h4 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Result
                  </h4>
                  <p className="text-green-700 dark:text-green-400 font-semibold leading-relaxed">
                    {project.result}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button size="sm" className="gap-2 shadow-lg">
                  <ExternalLink size={16} /> Live Demo
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Github size={16} /> Source Code
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
