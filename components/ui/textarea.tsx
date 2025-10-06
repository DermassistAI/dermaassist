import { cn } from '@/lib/utils';

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('min-h-[80px] w-full rounded-md border px-3 py-2', props.className)} {...props} />;
}

export default Textarea;
