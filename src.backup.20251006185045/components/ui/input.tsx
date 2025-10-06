import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input ref={ref} className={`input border rounded-md px-3 py-2 ${className}`} {...props} />
  )
);

Input.displayName = 'Input';

export default Input;
