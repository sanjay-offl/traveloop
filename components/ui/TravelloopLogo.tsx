'use client'

import React, { useId } from 'react'
import { useTheme } from '../theme/ThemeProvider'

interface TravelloopLogoProps {
  size?: number
  showText?: boolean
  className?: string
  variant?: 'icon' | 'full'
}

/**
 * Traveloop Premium Infinity Logo (v4 - Theme-Aware)
 *
 * DESIGN RATIONALE:
 * ✅ Pure SVG with full transparency - no background artifacts
 * ✅ Theme-aware coloring: Blue/Navy for light, Blue/White for dark
 * ✅ Premium minimal aesthetic matching Apple, Linear, Vercel
 * ✅ Responsive scaling with perfect clarity
 * ✅ Seamlessly integrated into UI without borders or containers
 *
 * FEATURES:
 * - Automatic light/dark mode switching
 * - Ribbon-based infinity symbol design
 * - Multi-stop gradients for depth
 * - Zero padding/background
 * - Enterprise SaaS quality
 */
export function TravelloopLogo({
  size = 32,
  showText = true,
  className = '',
  variant = 'full',
}: TravelloopLogoProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const height = size * 0.45

  // Use React's useId for consistent server/client hydration
  const id = useId()
  const gradientId = `ribbon-${id}`
  const highlightId = `highlight-${id}`

  // Light mode: Blue + Navy tones
  const lightColors = {
    primary: '#3B82F6', // Blue
    secondary: '#1E40AF', // Dark Navy
    accent: '#1E3A8A', // Deep Navy
    highlight: 'rgba(255, 255, 255, 0.6)', // White highlight
  }

  // Dark mode: Blue + White/Silver tones
  const darkColors = {
    primary: '#60A5FA', // Bright Blue
    secondary: '#93C5FD', // Light Blue
    accent: '#DBEAFE', // Very Light Blue
    highlight: 'rgba(255, 255, 255, 0.25)', // White highlight (subtle)
  }

  const colors = isDark ? darkColors : lightColors

  const logoSvg = (
    <svg
      viewBox="0 0 100 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        {/* Light Mode Gradient: Blue -> Navy -> Deep Navy */}
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="100"
          y2="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={isDark ? '#60A5FA' : '#3B82F6'} />
          <stop offset="50%" stopColor={isDark ? '#93C5FD' : '#1E40AF'} />
          <stop offset="100%" stopColor={isDark ? '#DBEAFE' : '#1E3A8A'} />
        </linearGradient>

        {/* Highlight Layer */}
        <linearGradient
          id={highlightId}
          x1="0"
          y1="0"
          x2="100"
          y2="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
        </linearGradient>
      </defs>

      {/* Infinity Symbol - Left loop */}
      <path
        d="M30 5C15 5 5 15 5 22.5C5 30 15 40 30 40C45 40 55 22.5 55 22.5L45 22.5C45 22.5 40 32 30 32C20 32 13 27 13 22.5C13 18 20 13 30 13C40 13 50 22.5 50 22.5L60 22.5C60 22.5 45 5 30 5Z"
        fill={`url(#${gradientId})`}
      />

      {/* Infinity Symbol - Right loop */}
      <path
        d="M70 5C85 5 95 15 95 22.5C95 30 85 40 70 40C55 40 45 22.5 45 22.5L55 22.5C55 22.5 60 32 70 32C80 32 87 27 87 22.5C87 18 80 13 70 13C60 13 50 22.5 50 22.5L40 22.5C40 22.5 55 5 70 5Z"
        fill={`url(#${gradientId})`}
      />

      {/* Subtle highlight for depth - only in dark mode */}
      {isDark && (
        <path
          d="M30 8C18 8 8 16 8 22.5C8 28 15 35 30 35C42 35 50 26 52 22.5"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  )

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Logo Icon - Clean, No Background */}
      <div
        className="flex-shrink-0 relative"
        style={{ width: size, height: height }}
        title="Traveloop"
      >
        {logoSvg}
      </div>

      {/* Logo Text */}
      {showText && (
        <span
          className="font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 select-none"
          style={{ fontSize: `${size * 0.75}px` }}
        >
          Traveloop
        </span>
      )}
    </div>
  )
}
