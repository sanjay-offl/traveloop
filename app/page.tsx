import Link from 'next/link'

export default function AuthPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Ambient glow orbs */}
      
      
      

      <div className="relative z-10 max-w-md w-full">
        {/* Card */}
        <div className="section-card px-8 py-12 sm:px-10 sm:py-14">
          <div className="text-center mb-10">
            <h1 className="text-zinc-900 dark:text-zinc-100 text-5xl font-extrabold tracking-tight mb-3 font-sans">
              Traveloop
            </h1>
            <p className="text-blue-600 dark:text-blue-400 text-lg font-accent font-medium">Smart Travel Planning</p>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-sm leading-relaxed">
              Organize trips, manage destinations, and share itineraries
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl hover:scale-105 transition-all w-full block text-center py-4 text-base font-semibold"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-black text-white dark:bg-white dark:text-black border border-black/5 dark:border-white/10 rounded-xl hover:scale-105 transition-all w-full block text-center py-4 text-base font-semibold"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-8 text-center text-zinc-600 dark:text-zinc-400 text-xs">
            <p>First time here? Start by creating an account to begin planning your adventures.</p>
          </div>
        </div>
      </div>
    </div>
  )
}