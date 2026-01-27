import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy } from 'react';
import './index.css';
import RootLayout from './layouts/RootLayout';
import MainLayout from './layouts/MainLayout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Skills = lazy(() => import('./pages/Skills'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>,
          },
          {
            path: 'about',
            element: <Suspense fallback={<div>Loading...</div>}><About /></Suspense>,
          },
          {
            path: 'projects',
            element: <Suspense fallback={<div>Loading...</div>}><Projects /></Suspense>,
          },
          {
            path: 'skills',
            element: <Suspense fallback={<div>Loading...</div>}><Skills /></Suspense>,
          },
          {
            path: 'contact',
            element: <Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
