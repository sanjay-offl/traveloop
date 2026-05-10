import Link from 'next/link'

import { NavbarProfile } from './NavbarProfile'

export function Navbar() {
  return (
    <header className="glass-nav mb-6">
      <div className="section-card flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-white transition-colors hover:text-brand-cyan"
        >
          Traveloop
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-6 sm:gap-8">
          <nav className="flex flex-wrap items-center gap-5 text-sm text-white/70">
            <a className="transition-colors hover:text-brand-cyan" href="#experiences">
              Experiences
            </a>
            <a className="transition-colors hover:text-brand-cyan" href="#stories">
              Stories
            </a>
            <a className="transition-colors hover:text-brand-cyan" href="#contact">
              Contact
            </a>
            <Link className="transition-colors hover:text-brand-cyan" href="/dashboard">
              Dashboard
            </Link>
          </nav>
          <NavbarProfile />
        </div>
      </div>
    </header>
  )
}
