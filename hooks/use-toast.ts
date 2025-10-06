"use client";

import { toast as sonnerToast } from 'sonner';

export function useToast() {
  // Simple adapter so existing code calling useToast().toast(...) keeps working
  return { toast: sonnerToast };
}

export default useToast;
