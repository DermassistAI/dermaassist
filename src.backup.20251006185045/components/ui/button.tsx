import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
  children?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', variant, size, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium';
    return (
      <button ref={ref} className={`${base} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
