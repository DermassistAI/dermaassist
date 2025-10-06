import * as React from 'react';
import { cn } from '@/lib/utils';

export const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className={cn('text-sm font-medium', className)} {...props} />;
};

export default Label;
