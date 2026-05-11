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

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F1F1] dark:bg-[#050505] font-sans transition-colors duration-500">
      {/* ── Topbar ── */}
      <header className="flex w-full items-center justify-between border-b border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl px-4 py-3 md:px-10">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <TravelloopLogo size={32} />
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
            <TravelloopLogo size={56} showText={false} className="mb-6" />
            <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl font-extrabold tracking-tight text-center">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              Enter your details to sign in
            </p>
          </div>

          <div className="px-8 md:px-10 pb-10">
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
