import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Home - Portfolio';
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          Hello, I'm{' '}
          <span className="text-blue-600 dark:text-blue-400">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          A passionate developer building amazing web experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View Projects
          </button>
          <button className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-medium transition-colors">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
