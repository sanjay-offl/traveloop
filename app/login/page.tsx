'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '../../utils/supabase/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '../../lib/validations'
import { TravelloopLogo } from '../../components/ui/TravelloopLogo'

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setServerError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setServerError(error.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleGoogleSignIn = async () => {
    setServerError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      },
    })

    if (error) {
      setServerError(error.message)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F1F1] dark:bg-[#050505] font-sans transition-colors duration-500">
      {/* ── Topbar ── */}
      <header className="flex w-full items-center justify-between border-b border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl px-4 py-3 md:px-10">
        <Link href="/" className="hover:opacity-80 transition-opacity" title="Traveloop Home">
          <TravelloopLogo size={32} showText={false} />
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:inline">Don&apos;t have an account?</span>
          <Link href="/register" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline font-accent">
            Sign up
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-[440px] section-card overflow-hidden">
          {/* ── Card header: Logo + welcome ── */}
          <div className="pt-10 pb-6 flex flex-col items-center">
            <div className="mb-8">
              <TravelloopLogo size={48} showText={false} />
            </div>
            <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl font-extrabold tracking-tight text-center">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              Enter your details to sign in
            </p>
          </div>

          <div className="px-8 md:px-10 pb-10">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <text x="-999" y="-999">Google</text>
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sign in with Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-300 dark:border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-600 dark:text-zinc-400">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className={`form-input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300" htmlFor="password">
                    Password
                  </label>
                  <a className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline" href="#">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register('password')}
                    className={`form-input pr-11 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              {serverError && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-3">
                  <span className="material-symbols-outlined text-red-500 text-lg flex-shrink-0 mt-0.5">error</span>
                  <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3.5 text-base rounded-xl mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing in…
                  </span>
                ) : 'Sign In'}
              </button>

              <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 pt-2">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Create one free
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
