import Link from 'next/link'

export function DashboardFooter() {
  return (
    <footer className="mt-4 border-t border-white/[0.06] pt-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/40">© 2026 Traveloop · Dashboard</p>
        <div className="flex flex-wrap gap-4 text-sm text-white/40">
          <Link href="/home" className="transition-colors hover:text-brand-accent">
            Marketing site
          </Link>
          <a href="#hero" className="transition-colors hover:text-brand-accent">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
