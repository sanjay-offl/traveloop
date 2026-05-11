'use client'

import { useState } from 'react'
import { MOCK_NOTIFICATIONS } from '../../../hooks/useMockData'
import type { NotificationItem } from '../../../lib/types'

export function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => n.unread).length

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  function dismiss(id: string) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <section id="notifications" className="mb-8 scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-zinc-900 dark:text-zinc-100 text-lg font-extrabold tracking-tight">Notifications</h2>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`card-premium p-4 transition-all group ${
              n.unread
                ? 'border-blue-600/25 dark:border-blue-500/25 bg-blue-600/[0.03] dark:bg-blue-500/[0.04]'
                : ''
            }`}
          >
            <div className="flex gap-3 items-start">
              {/* Icon */}
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: n.color + '18' }}
              >
                <span
                  className="material-symbols-outlined text-base"
                  style={{ color: n.color }}
                >
                  {n.icon}
                </span>
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold leading-snug ${n.unread ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300'}`}>
                    {n.title}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    {n.unread && (
                      <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                    )}
                    <button
                      onClick={() => dismiss(n.id)}
                      className="text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Dismiss"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{n.body}</p>
                <p className="mt-1.5 text-[10px] text-zinc-400 dark:text-zinc-600">{n.time}</p>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="card-premium p-8 text-center">
            <span className="material-symbols-outlined text-3xl text-zinc-300 dark:text-zinc-600 mb-2 block">notifications_off</span>
            <p className="text-sm text-zinc-500">All caught up! No new notifications.</p>
          </div>
        )}
      </div>
    </section>
  )
}
