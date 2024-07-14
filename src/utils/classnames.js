import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export default function classNames(...args) {
  return twMerge(clsx(args))
}
