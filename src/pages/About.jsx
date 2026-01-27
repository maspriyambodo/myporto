export default function About() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              My Story
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              I'm a passionate software engineer with expertise in frontend and backend development.
              I love creating beautiful and functional web applications that provide great user experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source,
              or enjoying time with friends and family.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'].map((tech) => (
                <div
                  key={tech}
                  className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-center text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
