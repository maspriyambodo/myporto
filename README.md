# Professional Portfolio Site

A professional portfolio website for a Fullstack Web Developer, SysAdmin, and Database Administrator.

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Docker + Nginx

## Features

- **Hero Section:** High-impact headline with key value propositions.
- **About Me:** Professional summary focused on problem-solving.
- **Skills:** Categorized technical expertise (Frontend, Backend, DevOps, Database).
- **Services:** Freelance service offerings.
- **Projects:** Detailed case studies with Problem, Solution, and Result.
- **Tech Stack:** Visual representation of core tools.
- **Contact:** Functional contact form (dummy) and social links.
- **Responsive:** Mobile-first design.
- **Production Ready:** Optimized Docker configuration with Nginx.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- Docker (optional, for production)

### Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production with Docker

1. Build and run the container:

   ```bash
   docker-compose up -d --build
   ```

2. Access the site at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── assets/             # Static assets
├── components/         # Reusable React components
│   ├── UI.tsx          # Base UI components (Button, Card, Section)
│   ├── Layout.tsx      # Navbar and Footer
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills section
│   ├── Services.tsx    # Services section
│   ├── Projects.tsx    # Projects section
│   ├── TechStack.tsx   # Tech stack section
│   └── Contact.tsx     # Contact section
├── utils/
│   └── data.ts         # Dummy data and interfaces
├── App.tsx             # Main application component
└── main.tsx            # Entry point
```

## Deployment

The project is configured for easy deployment using Docker. The `Dockerfile` uses a multi-stage build to keep the production image small and secure, serving the static assets via Nginx with optimized configuration (Gzip, caching, security headers).
