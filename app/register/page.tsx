"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { createClient } from '../../utils/supabase/client';

const RegisterPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim() || !password.trim()) {
      setError('First name, email, and password are required.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    const supabase = createClient();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName,
          country: selectedCountry || null,
        },
      },
    });

    if (authError) {
      setError(authError.message || 'Unable to create account. Please try again.');
      setLoading(false);
      return;
    }

    setLoading(false);

    if (data.session) {
      router.push('/dashboard');
      router.refresh();
      return;
    }

    setMessage('Account created. Please check your email to confirm your account before signing in.');
  };

  return (
    <div className="flex min-h-screen flex-col font-sans relative overflow-hidden">
      {/* Ambient glow */}
      
      

      <header className="flex w-full items-center justify-between border-b border-black/5 dark:border-white/10 bg-[#F5F5F5] dark:bg-[#050505] backdrop-blur-xl px-4 py-4 md:px-10">
        <Link href="/" className="font-sans text-2xl font-bold tracking-tight transition-opacity hover:opacity-80 md:text-3xl">
          <span className="text-zinc-900 dark:text-zinc-100">Traveloop</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:inline md:text-sm">Already have an account?</span>
          <Link href="/login" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline font-accent">
            Log in
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4 relative z-10">
        {/* Main Registration Card */}
        <div className="w-full max-w-[800px] section-card overflow-hidden">
          
          {/* Photo Upload Section */}
          <div className="pt-10 pb-6 flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-[#EAEAEA] dark:bg-[#1A1A1A] border-2 border-dashed border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden transition-all hover:border-accent-primary hover:bg-blue-600 dark:bg-blue-500/5">
                <img 
                  alt="Profile placeholder" 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsdoC56yqJ5ZmbvHFjiecoAyHMLc8x9lIsPZbcQLiYSgQkgkulGfA5nXlNhTsN7LhPum-iGEPlHpzIVKaBAreVRk4CAkyBkb_5RVOjpaiBhCZI-tg8YRULXvaDRXxHUdHXIjFllQquOvy1zqusOfTHY6l1frrc0TUfXIMXJis2mla2ncwPJxm3pfVQf_vR033Sa3ortJyJB-AQn6AH5ovqc6xgh9MLI3RQvaSqW9dTMActZ27TgieSOjXj50-crEGB23Y16iRX0ZSj" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 dark:bg-blue-500/20 rounded-full">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[32px]">add_a_photo</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl font-extrabold tracking-tight">Join the Adventure</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Complete your profile to start planning your next journey</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 md:px-12 pb-10">
            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block mb-2" htmlFor="firstName">First Name</label>
                  <input
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 placeholder-text-secondary/40 transition-all backdrop-blur-sm"
                    id="firstName"
                    placeholder="John"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block mb-2" htmlFor="lastName">Last Name</label>
                  <input
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 placeholder-text-secondary/40 transition-all backdrop-blur-sm"
                    id="lastName"
                    placeholder="Doe"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block mb-2" htmlFor="email">Email Address</label>
                <input
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 placeholder-text-secondary/40 transition-all backdrop-blur-sm"
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              {/* Country Selection */}
              <div>
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block mb-2" htmlFor="country">Country</label>
                <select 
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-all backdrop-blur-sm"
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="" className="bg-[#EAEAEA] dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100">Select your country</option>
                  <option value="USA" className="bg-[#EAEAEA] dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100">United States</option>
                  <option value="UK" className="bg-[#EAEAEA] dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100">United Kingdom</option>
                  <option value="Canada" className="bg-[#EAEAEA] dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100">Canada</option>
                  <option value="Australia" className="bg-[#EAEAEA] dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100">Australia</option>
                  <option value="Other" className="bg-[#EAEAEA] dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100">Other</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block mb-2" htmlFor="password">Password</label>
                <input
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 placeholder-text-secondary/40 transition-all backdrop-blur-sm"
                  id="password"
                  placeholder="Create a strong password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : null}

              {message ? (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">{message}</p>
              ) : null}

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input className="mt-1 accent-accent-primary" id="terms" type="checkbox" />
                <label className="text-sm text-zinc-500 dark:text-zinc-400" htmlFor="terms">
                  I agree to the <a className="text-blue-600 dark:text-blue-400 hover:underline" href="#">Terms of Service</a> and <a className="text-blue-600 dark:text-blue-400 hover:underline" href="#">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:scale-105 transition-transform w-full py-3.5 text-base font-bold"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="border-t border-black/5 dark:border-white/10 pt-6 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
