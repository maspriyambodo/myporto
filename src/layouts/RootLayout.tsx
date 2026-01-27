import { Outlet } from 'react-router';

export function ErrorBoundary({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Oops!
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
