"use client";

import React, { useState } from 'react';
import Head from 'next/head';

const RegisterPage: React.FC = () => {
  // Simple state to handle country selection
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="font-['Manrope'] text-[#DEE1D4] bg-[#010302] min-h-screen flex flex-col">
      <Head>
        <title>Traveloop - Create Your Account</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;600&family=Geist:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      {/* TopAppBar */}
      <header className="flex justify-between items-center px-4 md:px-10 py-4 w-full bg-[#010302] border-b border-[#384540]/20">
        <div className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-[#52E3E8]">Traveloop</div>
        <div className="flex items-center gap-4">
          <span className="text-xs md:text-sm text-[#92A7A1] hidden sm:inline">Already have an account?</span>
          <a className="text-sm font-bold text-[#52E3E8] hover:underline" href="/login">Log in</a>
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
              <h1 className="font-['Space_Grotesk'] text-2xl font-semibold text-[#DEE1D4]">Join the Adventure</h1>
              <p className="text-sm text-[#92A7A1] mt-1">Complete your profile to start planning your next journey</p>
            </div>
          </div>

          {/* Registration Form */}
          <form className="px-8 pb-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Side-by-Side: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4]" htmlFor="first-name">First Name</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border-[#384540] border focus:ring-2 focus:ring-[#52E3E8] focus:border-[#52E3E8] transition-all bg-[#090f10] text-[#DEE1D4] placeholder:text-[#92A7A1]" 
                  id="first-name" 
                  placeholder="e.g. Julian" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4]" htmlFor="last-name">Last Name</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border-[#384540] border focus:ring-2 focus:ring-[#52E3E8] focus:border-[#52E3E8] transition-all bg-[#090f10] text-[#DEE1D4] placeholder:text-[#92A7A1]" 
                  id="last-name" 
                  placeholder="e.g. Bennett" 
                  type="text" 
                />
              </div>
            </div>

            {/* Side-by-Side: Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4]" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[#92A7A1] text-[20px]">mail</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-[#384540] border focus:ring-2 focus:ring-[#52E3E8] focus:border-[#52E3E8] transition-all bg-[#090f10] text-[#DEE1D4] placeholder:text-[#92A7A1]" 
                    id="email" 
                    placeholder="julian@example.com" 
                    type="email" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4]" htmlFor="phone">Phone #</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[#92A7A1] text-[20px]">call</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-[#384540] border focus:ring-2 focus:ring-[#52E3E8] focus:border-[#52E3E8] transition-all bg-[#090f10] text-[#DEE1D4] placeholder:text-[#92A7A1]" 
                    id="phone" 
                    placeholder="+1 (555) 000-0000" 
                    type="tel" 
                  />
                </div>
              </div>
            </div>

            {/* Side-by-Side: City & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4]" htmlFor="city">City</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border-[#384540] border focus:ring-2 focus:ring-[#52E3E8] focus:border-[#52E3E8] transition-all bg-[#090f10] text-[#DEE1D4] placeholder:text-[#92A7A1]" 
                  id="city" 
                  placeholder="London" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#DEE1D4]" htmlFor="country">Country</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border-[#384540] border focus:ring-2 focus:ring-[#52E3E8] focus:border-[#52E3E8] transition-all bg-[#090f10] text-[#DEE1D4] appearance-none" 
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option className="bg-[#232D26]" value="">Select Country</option>
                  <option className="bg-[#232D26]" value="uk">United Kingdom</option>
                  <option className="bg-[#232D26]" value="us">United States</option>
                  <option className="bg-[#232D26]" value="ca">Canada</option>
                  <option className="bg-[#232D26]" value="fr">France</option>
                </select>
              </div>
            </div>

            {/* Large Text Area */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#DEE1D4]" htmlFor="additional-info">Additional Information</label>
              <textarea 
                className="w-full px-4 py-3 rounded-lg border-[#384540] border focus:ring-2 focus:ring-[#52E3E8] focus:border-[#52E3E8] transition-all bg-[#090f10] text-[#DEE1D4] placeholder:text-[#92A7A1] resize-none" 
                id="additional-info" 
                placeholder="Tell us about your travel preferences, dietary requirements, or loyalty programs..." 
                rows={4}
              ></textarea>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                className="w-full bg-[#52E3E8] text-[#003738] font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition-all active:scale-95 duration-100 flex items-center justify-center gap-2" 
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                Register User
              </button>
            </div>

            {/* T&C Link */}
            <p className="text-center text-xs text-[#92A7A1] opacity-80 pt-2">
              By registering, you agree to our <a className="text-[#52E3E8] hover:underline" href="#">Terms of Service</a> and <a className="text-[#52E3E8] hover:underline" href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-8 w-full gap-4 bg-[#010302] border-t border-[#384540]">
        <div className="flex flex-col gap-2">
          <div className="font-['Space_Grotesk'] text-xl text-[#DEE1D4]">Traveloop</div>
          <div className="text-xs text-[#92A7A1] opacity-80">© 2024 Traveloop Logistics. All rights reserved.</div>
        </div>
        <nav className="flex gap-6">
          <a className="text-xs text-[#92A7A1] opacity-80 hover:text-[#52E3E8] transition-opacity" href="#">Privacy Policy</a>
          <a className="text-xs text-[#92A7A1] opacity-80 hover:text-[#52E3E8] transition-opacity" href="#">Terms of Service</a>
          <a className="text-xs text-[#92A7A1] opacity-80 hover:text-[#52E3E8] transition-opacity" href="#">Help Center</a>
        </nav>
      </footer>
    </div>
  );
};

export default RegisterPage;