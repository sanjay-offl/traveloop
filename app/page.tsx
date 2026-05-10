import Link from 'next/link'

export default function AuthPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] -top-40 -left-40 bg-brand-primary/20" />
      <div className="glow-orb w-[400px] h-[400px] -bottom-32 -right-32 bg-brand-purple/15" />
      <div className="glow-orb w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent/10" />

      <div className="relative z-10 max-w-md w-full">
        {/* Card */}
        <div className="section-card px-8 py-12 sm:px-10 sm:py-14">
          <div className="text-center mb-10">
            <h1 className="heading-gradient text-5xl font-extrabold tracking-tight mb-3 font-sans">
              Traveloop
            </h1>
            <p className="text-brand-accent text-lg font-accent font-medium">Smart Travel Planning</p>
            <p className="text-white/50 mt-4 text-sm leading-relaxed">
              Organize trips, manage destinations, and share itineraries
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="btn-primary-gradient w-full block text-center py-4 text-base"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="btn-glass w-full block text-center py-4 text-base"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-8 text-center text-white/40 text-xs">
            <p>First time here? Start by creating an account to begin planning your adventures.</p>
          </div>
        </div>
      </div>
    </div>
  )
}