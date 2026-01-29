import type { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'building-scalable-microservices-golang',
    title: 'Building Scalable Microservices with Golang',
    excerpt: 'Learn how to architect and build high-performance microservices using Golang, Docker, and Kubernetes for production environments.',
    content: `
# Building Scalable Microservices with Golang

Microservices architecture has become the de facto standard for building scalable, maintainable applications. In this comprehensive guide, we'll explore how to build production-ready microservices using Golang.

## Why Golang for Microservices?

Golang offers several advantages for microservice development:

- **Performance**: Compiled language with excellent runtime performance
- **Concurrency**: Built-in goroutines and channels for handling concurrent operations
- **Small Binary Size**: Produces small, self-contained binaries perfect for containers
- **Fast Compilation**: Quick build times improve developer productivity
- **Strong Standard Library**: Rich standard library reduces external dependencies

## Architecture Overview

A well-designed microservice architecture includes:

1. **API Gateway**: Single entry point for all client requests
2. **Service Discovery**: Dynamic service registration and discovery
3. **Load Balancing**: Distribute traffic across service instances
4. **Circuit Breaker**: Prevent cascading failures
5. **Distributed Tracing**: Monitor requests across services

## Building Your First Microservice

Let's create a simple user service:

\`\`\`go
package main

import (
    "encoding/json"
    "log"
    "net/http"
    "github.com/gorilla/mux"
)

type User struct {
    ID    string \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/users", getUsers).Methods("GET")
    r.HandleFunc("/users/{id}", getUser).Methods("GET")
    
    log.Fatal(http.ListenAndServe(":8080", r))
}
\`\`\`

## Containerization with Docker

Create a multi-stage Dockerfile for optimal image size:

\`\`\`dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
\`\`\`

## Best Practices

1. **Use Context for Cancellation**: Always pass context for timeout and cancellation
2. **Implement Health Checks**: Add /health and /ready endpoints
3. **Structured Logging**: Use structured logging for better observability
4. **Graceful Shutdown**: Handle shutdown signals properly
5. **Configuration Management**: Use environment variables or config files

## Conclusion

Building microservices with Golang provides excellent performance and developer experience. Start small, iterate, and scale as needed.
    `,
    author: {
      name: 'MasBodo',
      avatar: '/vite.svg',
      bio: 'Fullstack Developer & SysAdmin with 5+ years of experience',
    },
    category: 'Backend Development',
    tags: ['Golang', 'Microservices', 'Docker', 'Architecture', 'Backend'],
    coverImage: '/vite.svg',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    readTime: 8,
    featured: true,
    views: 1250,
    likes: 89,
  },
  {
    id: '2',
    slug: 'mastering-docker-containers',
    title: 'Mastering Docker: From Basics to Production',
    excerpt: 'A complete guide to Docker containerization, from basic concepts to production deployment strategies and best practices.',
    content: `
# Mastering Docker: From Basics to Production

Docker has revolutionized how we build, ship, and run applications. This guide covers everything from basics to production-ready deployments.

## What is Docker?

Docker is a platform for developing, shipping, and running applications in containers. Containers package your application with all its dependencies, ensuring consistency across environments.

## Key Concepts

### Images
Docker images are read-only templates used to create containers. Think of them as blueprints.

### Containers
Containers are running instances of images. They're lightweight, isolated, and portable.

### Dockerfile
A text file containing instructions to build a Docker image.

## Getting Started

Install Docker and verify:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

## Writing Efficient Dockerfiles

Here's an optimized Dockerfile for a Node.js application:

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## Docker Compose for Multi-Container Apps

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`

## Production Best Practices

1. **Use Multi-Stage Builds**: Reduce image size
2. **Don't Run as Root**: Create a non-root user
3. **Use .dockerignore**: Exclude unnecessary files
4. **Pin Image Versions**: Avoid 'latest' tag
5. **Scan for Vulnerabilities**: Use docker scan
6. **Implement Health Checks**: Monitor container health
7. **Limit Resources**: Set memory and CPU limits

## Security Considerations

- Keep base images updated
- Scan images for vulnerabilities
- Use official images when possible
- Minimize layers and image size
- Don't store secrets in images

## Conclusion

Docker is an essential tool for modern development. Master these concepts and you'll be deploying with confidence.
    `,
    author: {
      name: 'MasBodo',
      avatar: '/vite.svg',
      bio: 'Fullstack Developer & SysAdmin with 5+ years of experience',
    },
    category: 'DevOps',
    tags: ['Docker', 'Containers', 'DevOps', 'Deployment'],
    coverImage: '/vite.svg',
    publishedAt: '2024-01-10T09:00:00Z',
    readTime: 10,
    featured: true,
    views: 2100,
    likes: 156,
  },
  {
    id: '3',
    slug: 'postgresql-performance-optimization',
    title: 'PostgreSQL Performance Optimization: A Complete Guide',
    excerpt: 'Deep dive into PostgreSQL performance tuning, indexing strategies, query optimization, and monitoring techniques.',
    content: `
# PostgreSQL Performance Optimization: A Complete Guide

PostgreSQL is a powerful database, but it requires proper tuning to achieve optimal performance. This guide covers essential optimization techniques.

## Understanding Query Performance

Use EXPLAIN ANALYZE to understand query execution:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM users 
WHERE email = 'user@example.com';
\`\`\`

## Indexing Strategies

### B-Tree Indexes (Default)
Best for equality and range queries:

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
\`\`\`

### Partial Indexes
Index only relevant rows:

\`\`\`sql
CREATE INDEX idx_active_users 
ON users(email) 
WHERE active = true;
\`\`\`

### Composite Indexes
For queries with multiple conditions:

\`\`\`sql
CREATE INDEX idx_users_name_email 
ON users(last_name, first_name);
\`\`\`

## Query Optimization Techniques

### 1. Avoid SELECT *
Only select needed columns:

\`\`\`sql
-- Bad
SELECT * FROM users;

-- Good
SELECT id, name, email FROM users;
\`\`\`

### 2. Use LIMIT
Limit result sets:

\`\`\`sql
SELECT * FROM users 
ORDER BY created_at DESC 
LIMIT 10;
\`\`\`

### 3. Optimize JOINs
Use appropriate JOIN types and indexes:

\`\`\`sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.created_at > '2024-01-01';
\`\`\`

## Configuration Tuning

Key postgresql.conf parameters:

\`\`\`conf
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 4MB
\`\`\`

## Connection Pooling

Use PgBouncer for connection pooling:

\`\`\`ini
[databases]
mydb = host=localhost port=5432 dbname=mydb

[pgbouncer]
pool_mode = transaction
max_client_conn = 100
default_pool_size = 20
\`\`\`

## Monitoring and Maintenance

### Regular VACUUM
\`\`\`sql
VACUUM ANALYZE users;
\`\`\`

### Monitor Slow Queries
\`\`\`sql
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
\`\`\`

## Best Practices

1. **Regular Backups**: Use pg_dump or continuous archiving
2. **Monitor Disk Space**: Watch for table bloat
3. **Update Statistics**: Run ANALYZE regularly
4. **Use Connection Pooling**: Reduce connection overhead
5. **Partition Large Tables**: Improve query performance
6. **Monitor Locks**: Identify blocking queries

## Conclusion

PostgreSQL performance optimization is an ongoing process. Monitor, measure, and iterate to achieve optimal performance.
    `,
    author: {
      name: 'MasBodo',
      avatar: '/vite.svg',
      bio: 'Fullstack Developer & SysAdmin with 5+ years of experience',
    },
    category: 'Database',
    tags: ['PostgreSQL', 'Database', 'Performance', 'Optimization', 'SQL'],
    coverImage: '/vite.svg',
    publishedAt: '2024-01-05T14:00:00Z',
    readTime: 12,
    featured: true,
    views: 1890,
    likes: 142,
  },
  {
    id: '4',
    slug: 'react-typescript-best-practices',
    title: 'React + TypeScript: Best Practices for 2024',
    excerpt: 'Modern patterns and best practices for building type-safe React applications with TypeScript.',
    content: `
# React + TypeScript: Best Practices for 2024

TypeScript has become essential for building maintainable React applications. Let's explore modern patterns and best practices.

## Setting Up Your Project

Use Vite for fast development:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

## Component Patterns

### Functional Components with Props

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
};
\`\`\`

### Custom Hooks

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
\`\`\`

## State Management

### Using Context with TypeScript

\`\`\`typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
\`\`\`

## Type Safety Tips

### 1. Use Discriminated Unions

\`\`\`typescript
type ApiResponse<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
\`\`\`

### 2. Utility Types

\`\`\`typescript
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

type UserUpdate = Partial<Omit<User, 'id'>>;
type UserPreview = Pick<User, 'id' | 'name'>;
\`\`\`

### 3. Generic Components

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
\`\`\`

## Performance Optimization

### Memoization

\`\`\`typescript
const MemoizedComponent = React.memo<Props>(({ data }) => {
  return <div>{data}</div>;
});

const expensiveCalculation = useMemo(() => {
  return data.reduce((acc, item) => acc + item.value, 0);
}, [data]);
\`\`\`

## Testing

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('button click handler', async () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);
  
  await userEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
\`\`\`

## Best Practices Summary

1. **Strict Mode**: Enable strict TypeScript settings
2. **Type Inference**: Let TypeScript infer when possible
3. **Avoid Any**: Use unknown or proper types
4. **Component Props**: Always type component props
5. **Error Boundaries**: Implement error handling
6. **Code Splitting**: Use React.lazy for large apps

## Conclusion

TypeScript makes React development more predictable and maintainable. Follow these patterns for robust applications.
    `,
    author: {
      name: 'MasBodo',
      avatar: '/vite.svg',
      bio: 'Fullstack Developer & SysAdmin with 5+ years of experience',
    },
    category: 'Frontend Development',
    tags: ['React', 'TypeScript', 'Frontend', 'Best Practices'],
    coverImage: '/vite.svg',
    publishedAt: '2024-01-01T08:00:00Z',
    readTime: 9,
    featured: false,
    views: 1650,
    likes: 98,
  },
  {
    id: '5',
    slug: 'linux-server-security-hardening',
    title: 'Linux Server Security Hardening: Essential Steps',
    excerpt: 'Comprehensive guide to securing your Linux servers with practical steps and best practices for production environments.',
    content: `
# Linux Server Security Hardening: Essential Steps

Security should be your top priority when managing Linux servers. This guide covers essential hardening steps for production environments.

## Initial Server Setup

### 1. Update System Packages

\`\`\`bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
\`\`\`

### 2. Create Non-Root User

\`\`\`bash
adduser deploy
usermod -aG sudo deploy
\`\`\`

### 3. Configure SSH

Edit /etc/ssh/sshd_config:

\`\`\`conf
Port 2222
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AllowUsers deploy
\`\`\`

Restart SSH:
\`\`\`bash
sudo systemctl restart sshd
\`\`\`

## Firewall Configuration

### Using UFW (Ubuntu)

\`\`\`bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2222/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
\`\`\`

### Using firewalld (CentOS)

\`\`\`bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=2222/tcp
sudo firewall-cmd --reload
\`\`\`

## Fail2Ban Setup

Install and configure Fail2Ban:

\`\`\`bash
sudo apt install fail2ban -y
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
\`\`\`

Configure /etc/fail2ban/jail.local:

\`\`\`ini
[sshd]
enabled = true
port = 2222
maxretry = 3
bantime = 3600
\`\`\`

## Automatic Security Updates

### Ubuntu/Debian

\`\`\`bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
\`\`\`

## File System Security

### Set Proper Permissions

\`\`\`bash
# Web root
sudo chown -R www-data:www-data /var/www
sudo find /var/www -type d -exec chmod 755 {} \\;
sudo find /var/www -type f -exec chmod 644 {} \\;

# SSH keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
\`\`\`

## Monitoring and Logging

### Install and Configure Logwatch

\`\`\`bash
sudo apt install logwatch -y
sudo logwatch --detail High --mailto admin@example.com --service all --range today
\`\`\`

### Monitor Failed Login Attempts

\`\`\`bash
sudo lastb | head -20
\`\`\`

## Additional Security Measures

### 1. Disable Unused Services

\`\`\`bash
sudo systemctl list-unit-files --state=enabled
sudo systemctl disable <service-name>
\`\`\`

### 2. Install and Configure AppArmor/SELinux

\`\`\`bash
# Check AppArmor status
sudo aa-status

# Enable SELinux
sudo setenforce 1
\`\`\`

### 3. Regular Security Audits

\`\`\`bash
# Install Lynis
sudo apt install lynis -y

# Run security audit
sudo lynis audit system
\`\`\`

## Backup Strategy

### Automated Backups

\`\`\`bash
#!/bin/bash
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)

# Database backup
mysqldump -u root -p database > $BACKUP_DIR/db_$DATE.sql

# Files backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www

# Keep only last 7 days
find $BACKUP_DIR -mtime +7 -delete
\`\`\`

## Security Checklist

- [ ] System packages updated
- [ ] Non-root user created
- [ ] SSH hardened
- [ ] Firewall configured
- [ ] Fail2Ban installed
- [ ] Automatic updates enabled
- [ ] File permissions set
- [ ] Monitoring configured
- [ ] Backups automated
- [ ] Security audit performed

## Conclusion

Server security is an ongoing process. Regularly review and update your security measures to protect against new threats.
    `,
    author: {
      name: 'MasBodo',
      avatar: '/vite.svg',
      bio: 'Fullstack Developer & SysAdmin with 5+ years of experience',
    },
    category: 'System Administration',
    tags: ['Linux', 'Security', 'SysAdmin', 'Server', 'DevOps'],
    coverImage: '/vite.svg',
    publishedAt: '2023-12-28T11:00:00Z',
    readTime: 15,
    featured: false,
    views: 2340,
    likes: 187,
  },
  {
    id: '6',
    slug: 'nginx-reverse-proxy-guide',
    title: 'Nginx as a Reverse Proxy: Complete Configuration Guide',
    excerpt: 'Learn how to configure Nginx as a reverse proxy for your applications with SSL, load balancing, and caching.',
    content: `
# Nginx as a Reverse Proxy: Complete Configuration Guide

Nginx is a powerful web server that excels as a reverse proxy. This guide covers everything from basic setup to advanced configurations.

## What is a Reverse Proxy?

A reverse proxy sits between clients and backend servers, forwarding client requests and returning server responses. Benefits include:

- Load balancing
- SSL termination
- Caching
- Security
- Compression

## Basic Reverse Proxy Setup

### Simple Proxy Configuration

\`\`\`nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

## SSL/TLS Configuration

### Using Let's Encrypt

\`\`\`bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d example.com -d www.example.com
\`\`\`

### SSL Configuration

\`\`\`nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
\`\`\`

## Load Balancing

### Round Robin (Default)

\`\`\`nginx
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
\`\`\`

### Weighted Load Balancing

\`\`\`nginx
upstream backend {
    server backend1.example.com weight=3;
    server backend2.example.com weight=2;
    server backend3.example.com weight=1;
}
\`\`\`

### IP Hash (Session Persistence)

\`\`\`nginx
upstream backend {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
}
\`\`\`

## Caching Configuration

\`\`\`nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;

server {
    location / {
        proxy_cache my_cache;
        proxy_cache_valid 200 60m;
        proxy_cache_valid 404 1m;
        proxy_cache_bypass $http_cache_control;
        add_header X-Cache-Status $upstream_cache_status;
        
        proxy_pass http://backend;
    }
}
\`\`\`

## Security Headers

\`\`\`nginx
server {
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
\`\`\`

## Rate Limiting

\`\`\`nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    location /api/ {
        limit_req zone=mylimit burst=20 nodelay;
        proxy_pass http://backend;
    }
}
\`\`\`

## WebSocket Support

\`\`\`nginx
location /ws {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400;
}
\`\`\`

## Monitoring and Logging

### Custom Log Format

\`\`\`nginx
log_format custom '$remote_addr - $remote_user [$time_local] '
                  '"$request" $status $body_bytes_sent '
                  '"$http_referer" "$http_user_agent" '
                  'rt=$request_time uct="$upstream_connect_time" '
                  'uht="$upstream_header_time" urt="$upstream_response_time"';

access_log /var/log/nginx/access.log custom;
\`\`\`

## Performance Tuning

\`\`\`nginx
worker_processes auto;
worker_connections 1024;

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss;
}
\`\`\`

## Testing Configuration

\`\`\`bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
\`\`\`

## Best Practices

1. **Always test configurations** before reloading
2. **Use SSL/TLS** for all production traffic
3. **Implement rate limiting** to prevent abuse
4. **Enable caching** for static content
5. **Monitor logs** regularly
6. **Keep Nginx updated** for security patches
7. **Use upstream health checks** for reliability

## Conclusion

Nginx is a versatile reverse proxy that can handle complex scenarios. Master these configurations for robust production deployments.
    `,
    author: {
      name: 'MasBodo',
      avatar: '/vite.svg',
      bio: 'Fullstack Developer & SysAdmin with 5+ years of experience',
    },
    category: 'DevOps',
    tags: ['Nginx', 'Reverse Proxy', 'Load Balancing', 'SSL', 'DevOps'],
    coverImage: '/vite.svg',
    publishedAt: '2023-12-20T13:00:00Z',
    readTime: 11,
    featured: false,
    views: 1780,
    likes: 134,
  },
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blogPosts.map(post => post.category)));
};

export const getAllTags = (): string[] => {
  const tags = blogPosts.flatMap(post => post.tags);
  return Array.from(new Set(tags));
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
