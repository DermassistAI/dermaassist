import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs', className)} {...props} />;
}

export default Badge;
