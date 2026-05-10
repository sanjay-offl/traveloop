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
    <div className="flex min-h-screen flex-col font-sans text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-orb w-[600px] h-[600px] -top-60 left-1/4 bg-brand-primary/15" />
      <div className="glow-orb w-[400px] h-[400px] bottom-0 right-0 bg-brand-purple/12" />

      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/[0.06] bg-brand-black/60 backdrop-blur-xl px-4 py-4 md:px-10">
        <Link href="/" className="font-sans text-2xl font-bold tracking-tight transition-opacity hover:opacity-80 md:text-3xl">
          <span className="heading-gradient">Traveloop</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-brand-accent/10 active:scale-95"
            aria-label="Help"
          >
            <span className="material-symbols-outlined text-xl text-brand-accent">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex flex-grow items-center justify-center px-4 pb-12 pt-24 md:px-10 relative z-10">
        <div className="w-full max-w-[440px]">
          {/* Login Card */}
          <div className="section-card p-8">
            {/* Profile/Icon Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-24 h-24 rounded-full bg-brand-surface flex items-center justify-center mb-6 overflow-hidden border-4 border-brand-black shadow-glow-sm">
                <img 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY1eQp60wqYOk3fk6drIgPytVZIT6kpZW4HBxJq1PNs_Nt2eg8wvzgIqVaSr-IXcOC7b4tswSCllFdcpGqmyd-WsYQoHlGz8kpqT1_WPL8A1tUcXHTEq_K8sWnTiouZQo3IWXnu8cJof8n85i_J3K7oZShbBm0bi01NWxbI6cMsw1WYjy6TmRUWkEiv4l8yo1BjYTvaUAGH6ZzftRjhmoaQX556P9aKXEFfpntDi-rVYeQw80EQCyX3Cg3lS-COXOefRgdAq7QHt9v" 
                />
              </div>
              <h1 className="heading-gradient mb-2 text-3xl font-extrabold tracking-tight">Welcome Back</h1>
              <p className="text-sm text-white/50 text-center">Log in to your dashboard to manage your upcoming adventures.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80 block" htmlFor="username">Username</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/35 group-focus-within:text-brand-accent transition-colors">person</span>
                  <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 placeholder-white/25 transition-all backdrop-blur-sm" id="username" placeholder="Enter your username" type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white/80 block" htmlFor="password">Password</label>
                  <a className="text-xs text-brand-accent hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/35 group-focus-within:text-brand-accent transition-colors">lock</span>
                  <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-12 pr-12 py-3.5 text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 placeholder-white/25 transition-all backdrop-blur-sm" id="password" placeholder="Enter your password" type={showPassword ? "text" : "password"} />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-brand-accent transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">{showPassword ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary-gradient w-full py-3.5 text-base font-bold"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 border-t border-white/[0.06] pt-6 text-center">
              <p className="text-sm text-white/45">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-brand-accent hover:underline">
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
