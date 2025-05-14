import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with tailwind-merge
 * This is useful for conditional classes and preventing class conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 