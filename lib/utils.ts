import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number with decimal (if applicable) and pad the decimal part
 * to 2 digits with 0.
 *
 * @example
 * formatNumberWithDecimal(123.45) // "123.45"
 * formatNumberWithDecimal(123) // "123"
 * formatNumberWithDecimal(123.4) // "123.40"
 */
export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
}

/**
 * Converts a string to a slug (a string suitable for inclusion in a URL).
 *
 * Slugifies the string by:
 * - Lowercasing the string
 * - Removing any non-alphanumeric and non-space characters
 * - Replacing sequences of spaces with a single hyphen
 * - Removing any leading or trailing hyphens
 *
 * @example
 * toSlug('hello world') // 'hello-world'
 * toSlug('foo-bar') // 'foo-bar'
 * toSlug('foo bar - baz -- quz') // 'foo-bar-baz-quz'
 */
export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
