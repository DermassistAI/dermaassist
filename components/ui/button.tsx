"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }
>(({ className, ...props }, ref) => {
  return (
    <button ref={ref} className={cn('inline-flex items-center justify-center', className)} {...props} />
  );
});
Button.displayName = 'Button';

export default Button;
