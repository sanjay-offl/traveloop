 'use client'

import { useAuthProfile } from '../../../hooks/useAuthProfile'

export function DashboardProfile() {
  const { displayName, email, initials } = useAuthProfile()

  return (
    <section id="profile" className="scroll-mt-24">
      <h3 className="mb-4 text-base font-medium text-zinc-900 dark:text-zinc-100" style={{ fontFamily: 'var(--font-display)' }}>
        Profile
      </h3>
      <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-bold"
          style={{ background: 'var(--cyan)', color: '#010302' }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{displayName}</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {email || 'No email available'} · Pro member
          </p>
          <p className="mt-2 text-xs" style={{ color: 'var(--muted)' }}>
            Edit avatar, home airport, and travel preferences in the full profile experience (coming next).
          </p>
        </div>
        <button type="button" className="btn-ghost shrink-0 px-5 py-2.5 text-sm">
          Edit profile
        </button>
      </div>
    </section>
  )
}
