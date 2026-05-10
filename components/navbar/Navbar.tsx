import Link from 'next/link'

import { NavbarProfile } from './NavbarProfile'

export function Navbar() {
  return (
    <header className="glass-nav mb-6">
      <div className="section-card flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-sans text-lg font-bold tracking-tight transition-colors hover:text-brand-accent"
        >
          <span className="heading-gradient">Traveloop</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-6 sm:gap-8">
          <nav className="flex flex-wrap items-center gap-5 text-sm text-white/60 font-medium">
            <a className="transition-colors hover:text-brand-accent" href="#experiences">
              Experiences
            </a>
            <a className="transition-colors hover:text-brand-accent" href="#stories">
              Stories
            </a>
            <a className="transition-colors hover:text-brand-accent" href="#contact">
              Contact
            </a>
          </nav>
          <NavbarProfile />
        </div>
      </div>
    </header>
  )
}
