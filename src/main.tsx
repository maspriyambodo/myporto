import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy } from 'react';
import './index.css';
import RootLayout, { ErrorBoundary } from './layouts/RootLayout';
import MainLayout from './layouts/MainLayout';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary error={undefined} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: 'about',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <About />
              </Suspense>
            ),
          },
          {
            path: 'projects',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Projects />
              </Suspense>
            ),
          },
          {
            path: 'skills',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Skills />
              </Suspense>
            ),
          },
          {
            path: 'contact',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Contact />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
