import Link from 'next/link'

import { NavbarProfile } from './NavbarProfile'
import { ThemeToggle } from '../theme/ThemeToggle'

export function Navbar() {
  return (
    <header className="glass-nav mb-6">
      <div className="section-card flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-sans text-lg font-bold tracking-tight transition-colors hover:text-blue-600 dark:text-blue-400"
        >
          <span className="text-zinc-900 dark:text-zinc-100">Traveloop</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-6 sm:gap-8">
          <nav className="flex flex-wrap items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <a className="transition-colors hover:text-blue-600 dark:text-blue-400" href="#experiences">
              Experiences
            </a>
            <a className="transition-colors hover:text-blue-600 dark:text-blue-400" href="#stories">
              Stories
            </a>
            <a className="transition-colors hover:text-blue-600 dark:text-blue-400" href="#contact">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NavbarProfile />
          </div>
        </div>
      </div>
    </header>
  )
}
