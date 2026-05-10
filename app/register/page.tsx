"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen flex-col font-sans text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-orb w-[500px] h-[500px] -top-40 right-0 bg-brand-purple/15" />
      <div className="glow-orb w-[400px] h-[400px] bottom-0 left-0 bg-brand-primary/12" />

      <header className="flex w-full items-center justify-between border-b border-white/[0.06] bg-brand-black/60 backdrop-blur-xl px-4 py-4 md:px-10">
        <Link href="/" className="font-sans text-2xl font-bold tracking-tight transition-opacity hover:opacity-80 md:text-3xl">
          <span className="heading-gradient">Traveloop</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-white/40 sm:inline md:text-sm">Already have an account?</span>
          <Link href="/login" className="text-sm font-bold text-brand-accent hover:underline font-accent">
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
              <div className="w-24 h-24 rounded-full bg-brand-black border-2 border-dashed border-white/[0.12] flex items-center justify-center overflow-hidden transition-all group-hover:border-brand-accent group-hover:bg-brand-accent/5">
                <img 
                  alt="Profile placeholder" 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsdoC56yqJ5ZmbvHFjiecoAyHMLc8x9lIsPZbcQLiYSgQkgkulGfA5nXlNhTsN7LhPum-iGEPlHpzIVKaBAreVRk4CAkyBkb_5RVOjpaiBhCZI-tg8YRULXvaDRXxHUdHXIjFllQquOvy1zqusOfTHY6l1frrc0TUfXIMXJis2mla2ncwPJxm3pfVQf_vR033Sa3ortJyJB-AQn6AH5ovqc6xgh9MLI3RQvaSqW9dTMActZ27TgieSOjXj50-crEGB23Y16iRX0ZSj" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-accent/20 rounded-full">
                  <span className="material-symbols-outlined text-brand-black text-[32px]">add_a_photo</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h1 className="heading-gradient text-2xl font-extrabold tracking-tight">Join the Adventure</h1>
              <p className="text-sm text-white/45 mt-2">Complete your profile to start planning your next journey</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 md:px-12 pb-10">
            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-white/80 block mb-2" htmlFor="firstName">First Name</label>
                  <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 placeholder-white/25 transition-all backdrop-blur-sm" id="firstName" placeholder="John" type="text" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-white/80 block mb-2" htmlFor="lastName">Last Name</label>
                  <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 placeholder-white/25 transition-all backdrop-blur-sm" id="lastName" placeholder="Doe" type="text" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-white/80 block mb-2" htmlFor="email">Email Address</label>
                <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 placeholder-white/25 transition-all backdrop-blur-sm" id="email" placeholder="john@example.com" type="email" />
              </div>

              {/* Country Selection */}
              <div>
                <label className="text-sm font-semibold text-white/80 block mb-2" htmlFor="country">Country</label>
                <select 
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 transition-all backdrop-blur-sm"
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="" className="bg-brand-surface">Select your country</option>
                  <option value="USA" className="bg-brand-surface">United States</option>
                  <option value="UK" className="bg-brand-surface">United Kingdom</option>
                  <option value="Canada" className="bg-brand-surface">Canada</option>
                  <option value="Australia" className="bg-brand-surface">Australia</option>
                  <option value="Other" className="bg-brand-surface">Other</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-white/80 block mb-2" htmlFor="password">Password</label>
                <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 placeholder-white/25 transition-all backdrop-blur-sm" id="password" placeholder="Create a strong password" type="password" />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input className="mt-1 accent-brand-accent" id="terms" type="checkbox" />
                <label className="text-sm text-white/50" htmlFor="terms">
                  I agree to the <a className="text-brand-accent hover:underline" href="#">Terms of Service</a> and <a className="text-brand-accent hover:underline" href="#">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary-gradient w-full py-3.5 text-base font-bold"
              >
                Create Account
              </button>

              <div className="border-t border-white/[0.06] pt-6 text-center">
                <p className="text-sm text-white/45">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-brand-accent hover:underline">
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
