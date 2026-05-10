'use client'

const inspirationImages = [
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', alt: 'Nature path' },
  { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80', alt: 'Forest' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80', alt: 'Lake mountains' },
  { src: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=400&q=80', alt: 'Desert dunes' },
  { src: 'https://images.unsplash.com/photo-1528543606781-2f6e8759f238?w=400&q=80', alt: 'Beach hammock' },
]

const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80',
]

export default function InspirationSection() {
  return (
    <section className="py-28 px-6 relative" id="inspiration">
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-0 -translate-y-1/2 bg-brand-primary/8" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal" style={{ animationDelay: '0.06s' }}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-brand-accent" />
              <span className="font-accent text-xs uppercase tracking-widest text-brand-accent font-semibold">Travel Inspiration</span>
            </div>
            <h2 className="heading-gradient mb-8 text-5xl font-extrabold leading-tight tracking-tight lg:text-6xl">
              New Way To<br />Experience<br />The World
            </h2>
            <blockquote className="mb-10 border-l-2 border-brand-accent pl-6">
              <p className="text-sm italic leading-relaxed text-white/45">
                &ldquo;The world is a book, and those who do not travel read only one page. Every journey is a story waiting to be written — let yours begin with Traveloop.&rdquo;
              </p>
              <footer className="mt-3 text-xs uppercase tracking-widest text-white/30 font-accent">— Traveloop Community</footer>
            </blockquote>
            <div className="flex items-center gap-6">
              <button className="btn-primary-gradient px-8 py-4 text-xs font-semibold uppercase tracking-widest flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                Watch the Story
              </button>
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <img key={i} src={src} alt="Traveler" className="w-10 h-10 rounded-full object-cover border-2 border-brand-black" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-brand-black flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)' }}>
                  <span className="text-white text-xs font-bold">50K</span>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal grid h-[480px] grid-cols-3 grid-rows-3 gap-3" style={{ animationDelay: '0.14s' }}>
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden group">
              <img src={inspirationImages[0].src} alt={inspirationImages[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            {inspirationImages.slice(1).map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden group">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}