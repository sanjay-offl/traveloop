import Link from 'next/link'

export function DashboardFooter() {
  return (
<<<<<<< HEAD
    <footer className="mt-4 border-t border-white/[0.06] pt-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/40">© 2026 Traveloop · Dashboard</p>
        <div className="flex flex-wrap gap-4 text-sm text-white/40">
          <Link href="/home" className="transition-colors hover:text-brand-accent">
            Marketing site
          </Link>
          <a href="#hero" className="transition-colors hover:text-brand-accent">
            Back to top
=======
    <footer className="mt-10 border-t pt-8" style={{ borderColor: 'var(--card-border)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            © 2026 Traveloop · Dashboard
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
            <Link href="/home" className="transition-colors hover:text-[var(--cyan)]" style={{ color: 'var(--muted)' }}>
              About
            </Link>
            <a href="mailto:hello@traveloop.app" className="transition-colors hover:text-[var(--cyan)]" style={{ color: 'var(--muted)' }}>
              Contact
            </a>
            <Link href="/home" className="transition-colors hover:text-[var(--cyan)]" style={{ color: 'var(--muted)' }}>
              Privacy Policy
            </Link>
          </nav>
        </div>
        <div id="settings" className="scroll-mt-24 rounded-xl border p-4 sm:p-5" style={{ borderColor: 'var(--card-border)', background: 'var(--card)' }}>
          <h2 className="text-sm font-medium text-white">Quick settings</h2>
          <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>
            Email digests, currency, and privacy controls will live here in a future release.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Social
          </span>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-[var(--cyan)]"
            style={{ color: 'var(--muted)' }}
          >
            Twitter / X
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-[var(--cyan)]"
            style={{ color: 'var(--muted)' }}
          >
            Instagram
          </a>
          <a
            href="https://github.com/sanjay-offl/traveloop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-[var(--cyan)]"
            style={{ color: 'var(--muted)' }}
          >
            GitHub
>>>>>>> origin/main
          </a>
        </div>
        <p className="text-center text-xs sm:text-left" style={{ color: 'var(--muted)' }}>
          <a href="#hero" className="hover:text-[var(--cyan)]">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  )
}
