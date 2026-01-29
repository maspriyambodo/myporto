-- MySQL Database Schema for Portfolio Website Backend
-- Created for MasBodo's portfolio site

-- Create database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Users table (for portfolio owner and potential admin users)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog categories
CREATE TABLE blog_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    author_id INT NOT NULL,
    category_id INT NOT NULL,
    cover_image_url VARCHAR(500),
    published_at TIMESTAMP NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    read_time INT NOT NULL COMMENT 'Reading time in minutes',
    featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_published_at (published_at),
    INDEX idx_featured (featured),
    INDEX idx_category (category_id),
    INDEX idx_author (author_id)
);

-- Blog tags
CREATE TABLE blog_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog post tags (many-to-many relationship)
CREATE TABLE blog_post_tags (
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE,
    INDEX idx_post (post_id),
    INDEX idx_tag (tag_id)
);

-- Projects
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    result TEXT NOT NULL,
    image_url VARCHAR(500),
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (featured),
    INDEX idx_display_order (display_order)
);

-- Project technologies (many-to-many relationship)
CREATE TABLE project_technologies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    technology_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_technology (technology_name)
);

-- Skills categories
CREATE TABLE skill_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order)
);

-- Skills
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Intermediate',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_display_order (display_order)
);

-- Services
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_active (is_active)
);

-- Contact messages
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_responded BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_is_read (is_read),
    INDEX idx_is_responded (is_responded)
);

-- Testimonials (optional feature)
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(255) NOT NULL,
    client_position VARCHAR(255),
    client_company VARCHAR(255),
    message TEXT NOT NULL,
    rating TINYINT CHECK (rating >= 1 AND rating <= 5),
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active),
    INDEX idx_display_order (display_order)
);

-- Site settings/configuration
CREATE TABLE site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key)
);

-- Analytics/Statistics (optional)
CREATE TABLE page_views (
    id INT PRIMARY KEY AUTO_INCREMENT,
    page_url VARCHAR(500) NOT NULL,
    page_type ENUM('blog_post', 'project', 'home', 'about', 'contact', 'other') DEFAULT 'other',
    page_id INT NULL COMMENT 'ID of the related content (blog post, project, etc.)',
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer_url VARCHAR(500),
    session_id VARCHAR(255),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_page_type (page_type),
    INDEX idx_page_id (page_id),
    INDEX idx_viewed_at (viewed_at),
    INDEX idx_session (session_id)
);

-- Insert default data

-- Insert default user (portfolio owner)
INSERT INTO users (username, email, password_hash, full_name, bio, linkedin_url, github_url) VALUES
('masbodo', 'maspriyambodo@gmail.com', '$2b$10$dummy.hash.for.demo.purposes.only', 'MasBodo', 'Fullstack Developer & SysAdmin with 5+ years of experience', 'https://www.linkedin.com/in/priyambodoss/', 'https://github.com/maspriyambodo/');

-- Insert blog categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Web Development', 'web-development', 'Articles about web development technologies and practices'),
('DevOps', 'devops', 'DevOps, CI/CD, and infrastructure articles'),
('System Administration', 'system-administration', 'Linux server administration and system management'),
('Database', 'database', 'Database design, optimization, and management'),
('Backend Development', 'backend-development', 'Server-side development and API design'),
('Frontend Development', 'frontend-development', 'Client-side development and UI/UX'),
('Tutorial', 'tutorial', 'Step-by-step guides and tutorials'),
('Best Practices', 'best-practices', 'Industry best practices and standards'),
('Career', 'career', 'Career advice and professional development');

-- Insert skill categories
INSERT INTO skill_categories (name, display_order) VALUES
('Frontend', 1),
('Backend', 2),
('DevOps/SysAdmin', 3),
('Database', 4);

-- Insert skills
INSERT INTO skills (category_id, name, proficiency_level, display_order) VALUES
(1, 'React', 'Advanced', 1),
(1, 'TypeScript', 'Advanced', 2),
(1, 'Tailwind CSS', 'Advanced', 3),
(1, 'Next.js', 'Intermediate', 4),
(1, 'Redux', 'Intermediate', 5),
(2, 'Laravel', 'Advanced', 1),
(2, 'Golang', 'Advanced', 2),
(2, 'Node.js', 'Advanced', 3),
(2, 'RESTful APIs', 'Expert', 4),
(2, 'gRPC', 'Intermediate', 5),
(3, 'Docker', 'Expert', 1),
(3, 'Nginx', 'Expert', 2),
(3, 'Linux (Ubuntu/CentOS)', 'Expert', 3),
(3, 'CI/CD', 'Advanced', 4),
(3, 'Ansible', 'Advanced', 5),
(4, 'MySQL', 'Expert', 1),
(4, 'PostgreSQL', 'Advanced', 2),
(4, 'Redis', 'Advanced', 3),
(4, 'MongoDB', 'Intermediate', 4),
(4, 'Database Optimization', 'Advanced', 5);

-- Insert services
INSERT INTO services (title, description, icon_name, display_order) VALUES
('Server Setup & Management', 'Secure and scalable server configuration, monitoring, and maintenance.', 'Server', 1),
('Backend API Development', 'Building robust, high-performance APIs using modern frameworks.', 'Code', 2),
('Database Optimization', 'Fine-tuning database performance, indexing, and query optimization.', 'Database', 3);

-- Insert projects
INSERT INTO projects (title, description, problem, solution, result, github_url, featured, display_order) VALUES
('Scalable E-commerce Backend', 'A high-performance backend system for a large-scale e-commerce platform.', "The existing system couldn't handle peak traffic during sales events, leading to frequent downtimes and slow response times.", 'Re-architected the backend using Golang and microservices, implemented Redis caching, and optimized PostgreSQL queries.', 'Reduced response times by 60% and successfully handled 10x peak traffic without downtime.', 'https://github.com/maspriyambodo', TRUE, 1),
('Secure Infrastructure Automation', 'Automated server provisioning and security hardening for a fintech startup.', 'Manual server setup was error-prone, inconsistent, and lacked proper security auditing.', 'Implemented Infrastructure as Code (IaC) using Terraform and Ansible, with automated security patching and monitoring.', 'Reduced deployment time from hours to minutes and achieved 99.99% uptime with real-time alerting.', 'https://github.com/maspriyambodo', TRUE, 2),
('Real-time Analytics Dashboard', 'A comprehensive dashboard for monitoring system performance and business metrics.', 'Stakeholders lacked visibility into real-time data, making it difficult to make informed decisions quickly.', 'Built a responsive frontend with React and TypeScript, integrated with a real-time WebSocket API and optimized database views.', 'Provided instant insights to the management team, leading to a 15% increase in operational efficiency.', 'https://github.com/maspriyambodo', TRUE, 3);

-- Insert project technologies
INSERT INTO project_technologies (project_id, technology_name) VALUES
(1, 'Golang'), (1, 'PostgreSQL'), (1, 'Redis'), (1, 'Docker'), (1, 'Nginx'),
(2, 'Linux'), (2, 'Ansible'), (2, 'Terraform'), (2, 'Prometheus'), (2, 'Grafana'),
(3, 'React'), (3, 'TypeScript'), (3, 'Tailwind CSS'), (3, 'Node.js'), (3, 'PostgreSQL');

-- Insert blog tags
INSERT INTO blog_tags (name, slug) VALUES
('Golang', 'golang'),
('Microservices', 'microservices'),
('Docker', 'docker'),
('PostgreSQL', 'postgresql'),
('Performance', 'performance'),
('Optimization', 'optimization'),
('React', 'react'),
('TypeScript', 'typescript'),
('Frontend', 'frontend'),
('Backend', 'backend'),
('DevOps', 'devops'),
('Linux', 'linux'),
('Security', 'security'),
('Nginx', 'nginx'),
('Database', 'database');

-- Insert sample blog posts (you would need to insert actual content)
-- Note: This is just a structure example. In a real scenario, you'd insert the full content.

-- Insert site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_title', 'MasBodo - Fullstack Developer & SysAdmin', 'string', 'Website title'),
('site_description', 'Portfolio and blog of MasBodo, a fullstack developer and system administrator with 5+ years of experience.', 'string', 'Website meta description'),
('contact_email', 'maspriyambodo@gmail.com', 'string', 'Primary contact email'),
('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode'),
('analytics_enabled', 'true', 'boolean', 'Enable analytics tracking');

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at, is_published);
CREATE INDEX idx_blog_posts_search ON blog_posts(title, excerpt, content(500));
CREATE INDEX idx_contact_messages_status ON contact_messages(is_read, is_responded, created_at);
CREATE INDEX idx_page_views_analytics ON page_views(page_type, viewed_at);

-- Create views for common queries

-- View for published blog posts with author and category info
CREATE VIEW published_blog_posts AS
SELECT
    bp.id,
    bp.slug,
    bp.title,
    bp.excerpt,
    bp.content,
    bp.cover_image_url,
    bp.published_at,
    bp.updated_at,
    bp.read_time,
    bp.featured,
    bp.views_count,
    bp.likes_count,
    u.full_name as author_name,
    u.avatar_url as author_avatar,
    u.bio as author_bio,
    bc.name as category_name,
    bc.slug as category_slug
FROM blog_posts bp
JOIN users u ON bp.author_id = u.id
JOIN blog_categories bc ON bp.category_id = bc.id
WHERE bp.is_published = TRUE AND bp.published_at IS NOT NULL
ORDER BY bp.published_at DESC;

-- View for blog posts with tags
CREATE VIEW blog_posts_with_tags AS
SELECT
    bp.*,
    GROUP_CONCAT(bt.name) as tags,
    GROUP_CONCAT(bt.slug) as tag_slugs
FROM published_blog_posts bp
LEFT JOIN blog_post_tags bpt ON bp.id = bpt.post_id
LEFT JOIN blog_tags bt ON bpt.tag_id = bt.id
GROUP BY bp.id;

-- View for active skills with categories
CREATE VIEW active_skills AS
SELECT
    s.id,
    s.name,
    s.proficiency_level,
    s.display_order,
    sc.name as category_name
FROM skills s
JOIN skill_categories sc ON s.category_id = sc.id
ORDER BY sc.display_order, s.display_order;

-- View for active services
CREATE VIEW active_services AS
SELECT
    id,
    title,
    description,
    icon_name,
    display_order
FROM services
WHERE is_active = TRUE
ORDER BY display_order;

-- View for featured projects
CREATE VIEW featured_projects AS
SELECT
    p.*,
    GROUP_CONCAT(pt.technology_name) as technologies
FROM projects p
LEFT JOIN project_technologies pt ON p.id = pt.project_id
WHERE p.featured = TRUE
GROUP BY p.id
ORDER BY p.display_order;

-- Create stored procedures for common operations

-- Procedure to create a new blog post
DELIMITER //
CREATE PROCEDURE create_blog_post(
    IN p_slug VARCHAR(255),
    IN p_title VARCHAR(500),
    IN p_excerpt TEXT,
    IN p_content LONGTEXT,
    IN p_author_id INT,
    IN p_category_id INT,
    IN p_cover_image_url VARCHAR(500),
    IN p_read_time INT,
    IN p_featured BOOLEAN,
    IN p_is_published BOOLEAN
)
BEGIN
    INSERT INTO blog_posts (
        slug, title, excerpt, content, author_id, category_id,
        cover_image_url, read_time, featured, is_published,
        published_at
    ) VALUES (
        p_slug, p_title, p_excerpt, p_content, p_author_id, p_category_id,
        p_cover_image_url, p_read_time, p_featured, p_is_published,
        IF(p_is_published, NOW(), NULL)
    );
END //
DELIMITER ;

-- Procedure to increment blog post views
DELIMITER //
CREATE PROCEDURE increment_post_views(IN p_post_id INT)
BEGIN
    UPDATE blog_posts SET views_count = views_count + 1 WHERE id = p_post_id;
END //
DELIMITER ;

-- Procedure to add tags to a blog post
DELIMITER //
CREATE PROCEDURE add_blog_post_tags(IN p_post_id INT, IN p_tag_names TEXT)
BEGIN
    DECLARE tag_name VARCHAR(100);
    DECLARE tag_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(p_tag_names, ',', n), ',', -1) as tag
                           FROM (SELECT 1 as n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
                                 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) numbers
                           WHERE n <= 1 + (LENGTH(p_tag_names) - LENGTH(REPLACE(p_tag_names, ',', '')));
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO tag_name;
        IF done THEN
            LEAVE read_loop;
        END IF;

        SET tag_name = TRIM(tag_name);

        -- Insert tag if it doesn't exist
        INSERT IGNORE INTO blog_tags (name, slug) VALUES (tag_name, LOWER(REPLACE(tag_name, ' ', '-')));

        -- Get tag ID
        SELECT id INTO tag_id FROM blog_tags WHERE name = tag_name;

        -- Link tag to post
        INSERT IGNORE INTO blog_post_tags (post_id, tag_id) VALUES (p_post_id, tag_id);
    END LOOP;
    CLOSE cur;
END //
DELIMITER ;

-- Create triggers for automatic timestamps
DELIMITER //
CREATE TRIGGER update_blog_posts_timestamp
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_projects_timestamp
    BEFORE UPDATE ON projects
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_services_timestamp
    BEFORE UPDATE ON services
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_testimonials_timestamp
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END //
DELIMITER ;

-- Create user for the application (replace with actual credentials)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON portfolio_db.* TO 'portfolio_user'@'localhost' IDENTIFIED BY 'secure_password_here';
-- FLUSH PRIVILEGES;