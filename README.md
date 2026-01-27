# Programmer Portfolio

A modern, responsive portfolio website built with React, Tailwind CSS, and React Router v7.

## Project Overview

This is a single-page application featuring:

- Home page with hero section
- About section with bio and tech stack
- Projects gallery with project cards
- Skills showcase with categorized skills
- Contact form (UI only, no backend integration)

## Features

- Responsive design (mobile-first)
- Dark mode toggle with localStorage persistence
- Smooth transitions
- Lazy loading for route components
- SEO-friendly with meta tags
- Dockerized for easy deployment

## Tech Stack

- Frontend: React 19
- Routing: React Router v7 (createBrowserRouter)
- Styling: Tailwind CSS
- Icons: Lucide React
- Build Tool: Vite
- Container: Docker + Nginx

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository
2. Navigate to the project directory: `cd portfolio-site`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

The application will be available at `http://localhost:5173`

## Build for Production

To build and preview locally:

1. Build the application: `npm run build`
2. Preview the build: `npm run preview`

## Docker Build & Run

### Prerequisites

- Docker
- Docker Compose

### Running with Docker Compose

1. From the project root, run:
   ```
   docker-compose up --build
   ```

2. The application will be available at `http://localhost:3000`

### Manual Docker Build

1. Build the image:
   ```
   docker build -t portfolio-site .
   ```

2. Run the container:
   ```
   docker run -p 3000:80 portfolio-site
   ```

## Project Structure

```
src/
  components/          # Reusable components
  layouts/             # Layout components (RootLayout, MainLayout)
  pages/               # Page components
  hooks/               # Custom hooks
  styles/              # Additional styles
  utils/               # Utility functions
public/                # Static assets
```

## Deployment

The application is containerized and can be deployed to any platform that supports Docker containers, such as:

- AWS ECS/ECR
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Heroku with Docker support

## Customization

- Update personal information in the page components
- Modify colors and styling through Tailwind classes
- Add or remove pages by updating the router configuration
- Extend the project with additional features as needed

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

This project is licensed under the MIT License.
