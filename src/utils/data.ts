export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  result: string;
  imageUrl?: string;
  link?: string;
  github?: string;
}

export interface Skill {
  category: 'Frontend' | 'Backend' | 'DevOps/SysAdmin' | 'Database';
  items: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Scalable E-commerce Backend',
    description:
      'A high-performance backend system for a large-scale e-commerce platform.',
    problem:
      "The existing system couldn't handle peak traffic during sales events, leading to frequent downtimes and slow response times.",
    solution:
      'Re-architected the backend using Golang and microservices, implemented Redis caching, and optimized PostgreSQL queries.',
    techStack: ['Golang', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
    result:
      'Reduced response times by 60% and successfully handled 10x peak traffic without downtime.',
  },
  {
    id: '2',
    title: 'Secure Infrastructure Automation',
    description:
      'Automated server provisioning and security hardening for a fintech startup.',
    problem:
      'Manual server setup was error-prone, inconsistent, and lacked proper security auditing.',
    solution:
      'Implemented Infrastructure as Code (IaC) using Terraform and Ansible, with automated security patching and monitoring.',
    techStack: ['Linux', 'Ansible', 'Terraform', 'Prometheus', 'Grafana'],
    result:
      'Reduced deployment time from hours to minutes and achieved 99.99% uptime with real-time alerting.',
  },
  {
    id: '3',
    title: 'Real-time Analytics Dashboard',
    description:
      'A comprehensive dashboard for monitoring system performance and business metrics.',
    problem:
      'Stakeholders lacked visibility into real-time data, making it difficult to make informed decisions quickly.',
    solution:
      'Built a responsive frontend with React and TypeScript, integrated with a real-time WebSocket API and optimized database views.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    result:
      'Provided instant insights to the management team, leading to a 15% increase in operational efficiency.',
  },
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux'],
  },
  {
    category: 'Backend',
    items: ['Laravel', 'Golang', 'Node.js', 'RESTful APIs', 'gRPC'],
  },
  {
    category: 'DevOps/SysAdmin',
    items: ['Docker', 'Nginx', 'Linux (Ubuntu/CentOS)', 'CI/CD', 'Ansible'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'Database Optimization'],
  },
];

export const services: Service[] = [
  {
    title: 'Server Setup & Management',
    description:
      'Secure and scalable server configuration, monitoring, and maintenance.',
    icon: 'Server',
  },
  {
    title: 'Backend API Development',
    description:
      'Building robust, high-performance APIs using modern frameworks.',
    icon: 'Code',
  },
  {
    title: 'Database Optimization',
    description:
      'Fine-tuning database performance, indexing, and query optimization.',
    icon: 'Database',
  },
];
