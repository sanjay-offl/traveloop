const threads = [
  { title: 'Best rail pass for Kansai?', replies: 24, author: 'Marco' },
  { title: 'Carry-on only · 10 days', replies: 56, author: 'Priya' },
  { title: 'Hidden cafés in Porto', replies: 12, author: 'Sam' },
] as const

export function Community() {
  return (
    <section id="community" className="mb-8 scroll-mt-24">
      <h2 className="heading-gradient mb-4 text-lg font-extrabold tracking-tight">Community</h2>
      <div className="space-y-3">
        {threads.map((thread) => (
          <button
            key={thread.title}
            type="button"
            className="card-premium flex w-full items-center justify-between gap-4 p-4 text-left"
          >
            <div>
              <p className="font-medium text-white">{thread.title}</p>
              <p className="text-xs text-white/40">by {thread.author}</p>
            </div>
            <span className="shrink-0 rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-white/50 font-accent">
              {thread.replies} replies
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
