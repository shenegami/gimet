import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "percent",
    maximumFractionDigits: 0
  }).format(value);
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
