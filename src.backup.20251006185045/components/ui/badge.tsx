import React from 'react';

export const Badge: React.FC<{ variant?: string; className?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm ${className}`}>{children}</span>
);

export default Badge;
