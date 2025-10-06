"use client";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  // placeholder: real Tooltip may use Radix. This just renders children.
  return <>{children}</>;
}

export default TooltipProvider;
