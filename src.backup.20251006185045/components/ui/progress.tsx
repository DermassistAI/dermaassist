import React from 'react';

export const Progress: React.FC<{ value?: number; className?: string; 'aria-label'?: string }> = ({ value = 0, className = '', 'aria-label': ariaLabel }) => (
  <div
    className={`w-full bg-muted h-2 rounded ${className}`}
    role="progressbar"
    aria-label={ariaLabel || 'Progress'}
    aria-valuenow={Number(value)}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div style={{ width: `${value}%` }} className="bg-primary h-2 rounded" />
  </div>
);

export default Progress;
