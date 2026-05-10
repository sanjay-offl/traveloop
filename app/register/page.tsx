'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '../../utils/supabase/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '../../lib/validations'

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const passwordVal = watch('password', '')
  const passwordStrength = passwordVal.length === 0 ? null : passwordVal.length < 8 ? 'weak' : passwordVal.length < 12 ? 'fair' : 'strong'

  const onSubmit = async (data: RegisterInput) => {
    setServerError('')
    setMessage('')
    const supabase = createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
        },
      },
    })

    if (authError) {
      setServerError(authError.message || 'Unable to create account. Please try again.')
      return
    }

    if (authData.session) {
      router.push('/dashboard')
      router.refresh()
      return
    }

    setMessage('Account created! Check your email to confirm before signing in.')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F1F1F1] dark:bg-[#050505] font-sans">
      <header className="flex w-full items-center justify-between border-b border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl px-4 py-4 md:px-10">
        <Link href="/" className="font-sans text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          <span className="text-zinc-900 dark:text-zinc-100">Traveloop</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:inline">Already have an account?</span>
          <Link href="/login" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline font-accent">
            Log in
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-[500px] section-card overflow-hidden">
          <div className="pt-10 pb-6 flex flex-col items-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5"
              style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8)' }}
            >
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </div>
            <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl font-extrabold tracking-tight text-center">Create account</h1>
          </div>

          <div className="px-8 md:px-10 pb-10">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">Full name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  {...register('full_name')}
                  className={`form-input ${errors.full_name ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    {...register('password')}
                    className={`form-input pr-11 ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-600"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {(['weak', 'fair', 'strong'] as const).map((level, i) => (
                        <div key={level} className={`h-1 flex-1 rounded-full ${
                          passwordStrength === 'weak' && i === 0 ? 'bg-red-500' :
                          passwordStrength === 'fair' && i <= 1 ? 'bg-amber-500' :
                          passwordStrength === 'strong' ? 'bg-emerald-500' : 'bg-black/8 dark:bg-white/8'
                        }`} />
                      ))}
                    </div>
                  </div>
                )}
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  {...register('confirm')}
                  className={`form-input ${errors.confirm ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm.message}</p>}
              </div>

              {serverError && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-600">{serverError}</p>
                </div>
              )}

              {message && (
                <div className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                  <p className="text-sm text-emerald-700">{message}</p>
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3.5 text-base rounded-xl mt-2">
                {isSubmitting ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage
