// This file contains utility functions for the stock prediction platform.
// It includes functions for merging class names and formatting numbers.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
