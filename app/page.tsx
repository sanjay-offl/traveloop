import Link from 'next/link'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-brand-black to-brand-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 font-display">Traveloop</h1>
          <p className="text-brand-cyan text-lg">Smart Travel Planning</p>
          <p className="text-white/70 mt-4 text-sm">Organize trips, manage destinations, and share itineraries</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full block text-center bg-brand-cyan hover:bg-brand-cyan/90 text-brand-black font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-cyan/50"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="w-full block text-center border-2 border-brand-cyan/30 hover:border-brand-cyan text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:bg-brand-cyan/10"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-8 text-center text-white/50 text-xs">
          <p>First time here? Start by creating an account to begin planning your adventures.</p>
        </div>
      </div>
    </div>
  )
}