import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import RootLayout, { ErrorBoundary } from './layouts/RootLayout';
import MainLayout from './components/Layout';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Blog = lazy(() => import('./components/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const NotFound = lazy(() => import('./components/NotFound'));

// Admin components
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./components/admin/AdminProjects'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));

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
          {
            path: 'blog',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Blog />
              </Suspense>
            ),
          },
          {
            path: 'blog/:slug',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <BlogPost />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminProjects />
          </Suspense>
        ),
      },
      // Add more admin routes here as needed
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);