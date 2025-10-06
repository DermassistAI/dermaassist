import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn('flex h-10 w-full rounded-md border px-3 py-2', className)} {...props} />;
  }
);
Input.displayName = 'Input';

export default Input;
