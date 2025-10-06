export function Progress({ value = 0, className, ...props }: { value?: number; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default Progress;
