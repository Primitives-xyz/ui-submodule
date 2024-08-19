import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const randomIntInRange = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const mapEmpty = <T>(amount: number, fn: (index: number) => T): T[] => {
  return Array(amount)
    .fill(null)
    .map((_, index) => fn(index))
}
