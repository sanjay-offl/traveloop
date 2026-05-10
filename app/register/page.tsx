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
    <div className="flex min-h-screen flex-col bg-brand-black font-body text-[#DEE1D4]">
      <header className="flex w-full items-center justify-between border-b border-[#384540]/20 bg-brand-black px-4 py-4 md:px-10">
        <Link href="/" className="font-display text-2xl font-bold text-brand-cyan transition-opacity hover:opacity-80 md:text-3xl">
          Traveloop
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-[#92A7A1] sm:inline md:text-sm">Already have an account?</span>
          <Link href="/login" className="text-sm font-bold text-brand-cyan hover:underline">
            Log in
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        {/* Main Registration Card */}
        <div className="w-full max-w-[800px] bg-[#232D26] rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.4)] overflow-hidden border border-[#384540]">
          
          {/* Photo Upload Section */}
          <div className="pt-10 pb-6 flex flex-col items-center">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-[#090f10] border-2 border-dashed border-[#384540]/50 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#52E3E8] group-hover:bg-[#52E3E8]/5">
                <img 
                  alt="Profile placeholder" 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsdoC56yqJ5ZmbvHFjiecoAyHMLc8x9lIsPZbcQLiYSgQkgkulGfA5nXlNhTsN7LhPum-iGEPlHpzIVKaBAreVRk4CAkyBkb_5RVOjpaiBhCZI-tg8YRULXvaDRXxHUdHXIjFllQquOvy1zqusOfTHY6l1frrc0TUfXIMXJis2mla2ncwPJxm3pfVQf_vR033Sa3ortJyJB-AQn6AH5ovqc6xgh9MLI3RQvaSqW9dTMActZ27TgieSOjXj50-crEGB23Y16iRX0ZSj" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#52E3E8]/20">
                  <span className="material-symbols-outlined text-[#003738] text-[32px]">add_a_photo</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h1 className="font-display text-2xl font-semibold text-[#DEE1D4]">Join the Adventure</h1>
              <p className="text-sm text-[#92A7A1] mt-1">Complete your profile to start planning your next journey</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 md:px-12 pb-10">
            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-[#DEE1D4] block mb-2" htmlFor="firstName">First Name</label>
                  <input className="w-full bg-[#1a2220] border border-[#384540] rounded-lg px-4 py-3 text-[#DEE1D4] focus:outline-none focus:border-[#52E3E8] focus:ring-1 focus:ring-[#52E3E8] placeholder-[#5A6B65]" id="firstName" placeholder="John" type="text" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#DEE1D4] block mb-2" htmlFor="lastName">Last Name</label>
                  <input className="w-full bg-[#1a2220] border border-[#384540] rounded-lg px-4 py-3 text-[#DEE1D4] focus:outline-none focus:border-[#52E3E8] focus:ring-1 focus:ring-[#52E3E8] placeholder-[#5A6B65]" id="lastName" placeholder="Doe" type="text" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-[#DEE1D4] block mb-2" htmlFor="email">Email Address</label>
                <input className="w-full bg-[#1a2220] border border-[#384540] rounded-lg px-4 py-3 text-[#DEE1D4] focus:outline-none focus:border-[#52E3E8] focus:ring-1 focus:ring-[#52E3E8] placeholder-[#5A6B65]" id="email" placeholder="john@example.com" type="email" />
              </div>

              {/* Country Selection */}
              <div>
                <label className="text-sm font-semibold text-[#DEE1D4] block mb-2" htmlFor="country">Country</label>
                <select 
                  className="w-full bg-[#1a2220] border border-[#384540] rounded-lg px-4 py-3 text-[#DEE1D4] focus:outline-none focus:border-[#52E3E8] focus:ring-1 focus:ring-[#52E3E8]"
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">Select your country</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-[#DEE1D4] block mb-2" htmlFor="password">Password</label>
                <input className="w-full bg-[#1a2220] border border-[#384540] rounded-lg px-4 py-3 text-[#DEE1D4] focus:outline-none focus:border-[#52E3E8] focus:ring-1 focus:ring-[#52E3E8] placeholder-[#5A6B65]" id="password" placeholder="Create a strong password" type="password" />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input className="mt-1" id="terms" type="checkbox" />
                <label className="text-sm text-[#92A7A1]" htmlFor="terms">
                  I agree to the <a className="text-[#52E3E8] hover:underline" href="#">Terms of Service</a> and <a className="text-[#52E3E8] hover:underline" href="#">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-cyan py-3 font-bold text-brand-black transition-all duration-150 hover:bg-brand-cyan/90 active:scale-95"
              >
                Create Account
              </button>

              <div className="border-t border-[#384540] pt-6 text-center">
                <p className="text-sm text-[#92A7A1]">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-brand-cyan hover:underline">
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
