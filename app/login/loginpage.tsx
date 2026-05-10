import React, { useState } from 'react';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#010302] text-[#DEE1D4] font-['Manrope'] min-h-screen flex flex-col">
      <Head>
        <title>Login - Traveloop</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Inter:wght@400;600&family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;600&family=Geist:wght@500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      {/* TopAppBar */}
      <header className="bg-[#010302] flex justify-between items-center px-4 md:px-10 py-4 w-full top-0 fixed z-50 border-b border-[#384540]/20">
        <div className="text-2xl md:text-3xl font-bold text-[#52E3E8] font-['Space_Grotesk']">
          Traveloop
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-[#52E3E8]/10 transition-colors p-2 rounded-full active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[#52E3E8]">help_outline</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-4 md:px-10 pt-24 pb-12 bg-[#010302]">
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
              <h1 className="text-3xl font-semibold text-[#DEE1D4] mb-2 font-['Space_Grotesk']">Welcome Back</h1>
              <p className="text-sm text-[#92A7A1] text-center">Log in to your dashboard to manage your upcoming adventures.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4] block" htmlFor="username">Username</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#92A7A1] group-focus-within:text-[#52E3E8] transition-colors">person</span>
                  <input 
                    className="w-full pl-12 pr-4 py-3 bg-[#010302] border border-[#384540] rounded-lg focus:ring-2 focus:ring-[#52E3E8]/20 focus:border-[#52E3E8] transition-all outline-none text-[#DEE1D4] placeholder:text-[#92A7A1]/50" 
                    id="username" 
                    placeholder="Enter your username" 
                    type="text" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-[#DEE1D4] block" htmlFor="password">Password</label>
                  <a className="text-sm font-semibold text-[#52E3E8] hover:underline transition-all" href="#">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#92A7A1] group-focus-within:text-[#52E3E8] transition-colors">lock</span>
                  <input 
                    className="w-full pl-12 pr-12 py-3 bg-[#010302] border border-[#384540] rounded-lg focus:ring-2 focus:ring-[#52E3E8]/20 focus:border-[#52E3E8] transition-all outline-none text-[#DEE1D4] placeholder:text-[#92A7A1]/50" 
                    id="password" 
                    placeholder="Enter your password" 
                    type={showPassword ? "text" : "password"} 
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92A7A1] hover:text-[#DEE1D4] transition-colors" 
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full bg-[#52e3e8] text-[#003738] font-bold py-4 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all duration-100" type="submit">
                  Login
                </button>
              </div>
            </form>

            {/* Redirect to Registration */}
            <div className="mt-8 pt-8 border-t border-[#384540]/30 text-center">
              <p className="text-sm text-[#92A7A1]">
                Don't have an account yet? 
                <a className="font-bold text-[#52E3E8] hover:underline ml-1" href="#">Create an account</a>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex justify-center gap-6 opacity-30 text-[#92A7A1] hover:opacity-100 transition-all duration-300">
            <span className="material-symbols-outlined text-4xl">verified_user</span>
            <span className="material-symbols-outlined text-4xl">language</span>
            <span className="material-symbols-outlined text-4xl">travel_explore</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#010302] border-t border-[#384540] flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-8 w-full gap-4">
        <div className="text-xl font-semibold text-[#DEE1D4]">
          Traveloop
        </div>
        <div className="flex gap-6 text-sm">
          <a className="text-[#92A7A1] hover:text-[#52E3E8] transition-colors" href="#">Privacy Policy</a>
          <a className="text-[#92A7A1] hover:text-[#52E3E8] transition-colors" href="#">Terms of Service</a>
          <a className="text-[#92A7A1] hover:text-[#52E3E8] transition-colors" href="#">Help Center</a>
        </div>
        <div className="text-sm text-[#92A7A1]">
          © 2024 Traveloop Logistics. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;