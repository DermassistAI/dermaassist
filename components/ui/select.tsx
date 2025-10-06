import * as React from 'react';
import { cn } from '@/lib/utils';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('rounded-md border px-3 py-2', className)} {...props} />;
}

export default Select;

export function SelectTrigger({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}

export function SelectValue({ children, ...props }: any) {
  return <span {...props}>{children}</span>;
}

export function SelectContent({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}

export function SelectItem({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}
