import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl hover:from-blue-700 hover:to-blue-800',
    secondary:
      'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 hover:shadow-lg',
    outline:
      'border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg',
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 py-3',
    lg: 'h-14 px-10 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
  >
    {children}
  </div>
);

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  dark = false,
}) => (
  <section
    id={id}
    className={`py-16 md:py-24 ${dark ? 'bg-gray-900 text-white' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white'} ${className}`}
  >
    <div className="container mx-auto px-4">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          )}
          {subtitle && (
            <p
              className={`text-lg ${dark ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'} max-w-2xl mx-auto`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);
