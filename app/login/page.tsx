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
    <div className="flex min-h-screen flex-col font-sans relative overflow-hidden">
      {/* Ambient glow */}
      
      

      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-black/5 dark:border-white/10 bg-[#F1F1F1] dark:bg-[#050505] backdrop-blur-xl px-4 py-4 md:px-10">
        <Link href="/" className="font-sans text-2xl font-bold tracking-tight transition-opacity hover:opacity-80 md:text-3xl">
          <span className="text-zinc-900 dark:text-zinc-100">Traveloop</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-blue-600 dark:bg-blue-500/10 active:scale-95"
            aria-label="Help"
          >
            <span className="material-symbols-outlined text-xl text-blue-600 dark:text-blue-400">help_outline</span>
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
              <div className="w-24 h-24 rounded-full bg-[#EAEAEA] dark:bg-[#1A1A1A] flex items-center justify-center mb-6 overflow-hidden border-4 border-bg-base shadow-glow-sm">
                <img 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY1eQp60wqYOk3fk6drIgPytVZIT6kpZW4HBxJq1PNs_Nt2eg8wvzgIqVaSr-IXcOC7b4tswSCllFdcpGqmyd-WsYQoHlGz8kpqT1_WPL8A1tUcXHTEq_K8sWnTiouZQo3IWXnu8cJof8n85i_J3K7oZShbBm0bi01NWxbI6cMsw1WYjy6TmRUWkEiv4l8yo1BjYTvaUAGH6ZzftRjhmoaQX556P9aKXEFfpntDi-rVYeQw80EQCyX3Cg3lS-COXOefRgdAq7QHt9v" 
                />
              </div>
              <h1 className="text-zinc-900 dark:text-zinc-100 mb-2 text-3xl font-extrabold tracking-tight">Welcome Back</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">Log in to your dashboard to manage your upcoming adventures.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block" htmlFor="username">Username</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-blue-600 dark:text-blue-400 transition-colors">person</span>
                  <input className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-blue-600/50 dark:focus:border-blue-400/50 focus:ring-1 focus:ring-blue-600/30 dark:focus:ring-blue-400/30 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all backdrop-blur-sm text-zinc-900 dark:text-zinc-100" id="username" placeholder="Enter your username" type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block" htmlFor="password">Password</label>
                  <a className="text-xs text-blue-600 dark:text-blue-400 hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-blue-600 dark:text-blue-400 transition-colors">lock</span>
                  <input className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-blue-600/50 dark:focus:border-blue-400/50 focus:ring-1 focus:ring-blue-600/30 dark:focus:ring-blue-400/30 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all backdrop-blur-sm text-zinc-900 dark:text-zinc-100" id="password" placeholder="Enter your password" type={showPassword ? "text" : "password"} />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-blue-600 dark:text-blue-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <span className="material-symbols-outlined">{showPassword ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl hover:scale-105 transition-all w-full py-3.5 text-base font-bold"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 border-t border-black/5 dark:border-white/10 pt-6 text-center">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
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
