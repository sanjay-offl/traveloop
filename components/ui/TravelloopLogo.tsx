import React from 'react'

interface TravelloopLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

/**
 * Traveloop Premium Infinity Logo (v3 - Ultimate Precision)
 * 
 * DESIGN RATIONALE:
 * - Pure SVG for perfect transparency and theme awareness.
 * - Ribbon-like flow with layered depth using multi-stop gradients.
 * - Colors: Vivid Blue → Deep Indigo → Soft Cyan.
 * - Zero background artifacts, perfectly integrated into the UI surface.
 */
export function TravelloopLogo({ size = 32, showText = true, className = '' }: TravelloopLogoProps) {
  const height = size * 0.45
  
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div 
        className="relative flex-shrink-0" 
        style={{ width: size, height: height }}
      >
        <svg
          viewBox="0 0 100 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Ribbon Gradient: Blue -> Indigo -> Cyan */}
            <linearGradient id="ribbon-gradient" x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" /> {/* Blue */}
              <stop offset="50%" stopColor="#6366F1" /> {/* Indigo */}
              <stop offset="100%" stopColor="#22D3EE" /> {/* Cyan */}
            </linearGradient>

            {/* Dark Mode Accent (Lighter highlights) */}
            <linearGradient id="ribbon-highlight-dark" x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
            
            {/* Subtle shadow for depth */}
            <filter id="inner-depth" x="-10%" y="-10%" width="120%" height="120%">
              <feOffset dx="0" dy="1" />
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="out" />
            </filter>
          </defs>

          {/* Background Shadow Loop */}
          <path
            d="M70 5C85 5 95 15 95 22.5C95 30 85 40 70 40C55 40 45 22.5 45 22.5L55 22.5C55 22.5 60 32 70 32C80 32 87 27 87 22.5C87 18 80 13 70 13C60 13 50 22.5 50 22.5L40 22.5C40 22.5 55 5 70 5Z"
            fill="#1E1E2E"
            fillOpacity="0.2"
            className="hidden dark:block"
          />

          {/* Main Ribbon Loop */}
          <path
            d="M30 5C15 5 5 15 5 22.5C5 30 15 40 30 40C45 40 55 22.5 55 22.5L45 22.5C45 22.5 40 32 30 32C20 32 13 27 13 22.5C13 18 20 13 30 13C40 13 50 22.5 50 22.5L60 22.5C60 22.5 45 5 30 5ZM70 5C85 5 95 15 95 22.5C95 30 85 40 70 40C55 40 45 22.5 45 22.5L55 22.5C55 22.5 60 32 70 32C80 32 87 27 87 22.5C87 18 80 13 70 13C60 13 50 22.5 50 22.5L40 22.5C40 22.5 55 5 70 5Z"
            fill="url(#ribbon-gradient)"
          />
          
          {/* Layered Overlap Highlight */}
          <path
            d="M55 22.5C55 22.5 50 13 30 13C20 13 13 18 13 22.5C13 27 20 32 30 32"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {showText && (
        <span className="font-sans text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 select-none">
          Traveloop
        </span>
      )}
    </div>
  )
}
