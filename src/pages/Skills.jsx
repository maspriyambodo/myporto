import { Code, Database, Server, Palette, GitBranch, Zap } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
    },
    {
      title: 'Backend Development',
      icon: Server,
      skills: ['Node.js', 'Python', 'REST APIs', 'GraphQL', 'Express', 'Django'],
    },
    {
      title: 'Database',
      icon: Database,
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
    },
    {
      title: 'DevOps & Tools',
      icon: GitBranch,
      skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Vercel'],
    },
    {
      title: 'UI/UX Design',
      icon: Palette,
      skills: ['Figma', 'Adobe XD', 'Responsive Design', 'Mobile-First', 'Accessibility'],
    },
    {
      title: 'Performance',
      icon: Zap,
      skills: ['Web Vitals', 'Core Web Vitals', 'Optimization', 'Lazy Loading', 'Bundle Analysis'],
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <div className="flex items-center mb-4">
                <category.icon className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 px-3 py-1 rounded-md text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
