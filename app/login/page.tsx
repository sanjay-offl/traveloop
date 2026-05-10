"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-black font-body text-[#DEE1D4]">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-[#384540]/20 bg-brand-black px-4 py-4 md:px-10">
        <Link href="/" className="font-display text-2xl font-bold text-brand-cyan transition-opacity hover:opacity-80 md:text-3xl">
          Traveloop
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-brand-cyan/10 active:scale-95"
            aria-label="Help"
          >
            <span className="material-symbols-outlined text-xl text-brand-cyan">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex flex-grow items-center justify-center bg-brand-black px-4 pb-12 pt-24 md:px-10">
        <div className="w-full max-w-[440px]">
          {/* Login Card */}
          <div className="bg-[#232D26] rounded-xl p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.5)] border border-[#384540]">
            {/* Profile/Icon Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-24 h-24 rounded-full bg-[#384540] flex items-center justify-center mb-6 overflow-hidden border-4 border-[#010302] shadow-lg">
                <img 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY1eQp60wqYOk3fk6drIgPytVZIT6kpZW4HBxJq1PNs_Nt2eg8wvzgIqVaSr-IXcOC7b4tswSCllFdcpGqmyd-WsYQoHlGz8kpqT1_WPL8A1tUcXHTEq_K8sWnTiouZQo3IWXnu8cJof8n85i_J3K7oZShbBm0bi01NWxbI6cMsw1WYjy6TmRUWkEiv4l8yo1BjYTvaUAGH6ZzftRjhmoaQX556P9aKXEFfpntDi-rVYeQw80EQCyX3Cg3lS-COXOefRgdAq7QHt9v" 
                />
              </div>
              <h1 className="mb-2 font-display text-3xl font-semibold text-[#DEE1D4]">Welcome Back</h1>
              <p className="text-sm text-[#92A7A1] text-center">Log in to your dashboard to manage your upcoming adventures.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4] block" htmlFor="username">Username</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#92A7A1] group-focus-within:text-[#52E3E8] transition-colors">person</span>
                  <input className="w-full bg-[#1a2220] border border-[#384540] rounded-lg pl-12 pr-4 py-3 text-[#DEE1D4] focus:outline-none focus:border-[#52E3E8] focus:ring-1 focus:ring-[#52E3E8] placeholder-[#5A6B65] transition-all" id="username" placeholder="Enter your username" type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-[#DEE1D4] block" htmlFor="password">Password</label>
                  <a className="text-xs text-[#52E3E8] hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#92A7A1] group-focus-within:text-[#52E3E8] transition-colors">lock</span>
                  <input className="w-full bg-[#1a2220] border border-[#384540] rounded-lg pl-12 pr-12 py-3 text-[#DEE1D4] focus:outline-none focus:border-[#52E3E8] focus:ring-1 focus:ring-[#52E3E8] placeholder-[#5A6B65] transition-all" id="password" placeholder="Enter your password" type={showPassword ? "text" : "password"} />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92A7A1] hover:text-[#52E3E8] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">{showPassword ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-cyan py-3 font-bold text-brand-black transition-all duration-150 hover:bg-brand-cyan/90 active:scale-95"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 border-t border-[#384540] pt-6 text-center">
              <p className="text-sm text-[#92A7A1]">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-brand-cyan hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
