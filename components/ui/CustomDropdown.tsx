'use client'

import React, { useRef, useEffect, useState } from 'react'

interface DropdownOption {
  value: string
  label: string
  icon?: string
}

interface CustomDropdownProps {
  label?: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
}

/**
 * Custom styled dropdown component
 * Fully themed for dark/light mode with no browser defaults
 */
export function CustomDropdown({
  label,
  value,
  options,
  onChange,
  className = '',
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className={`relative inline-block w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-2.5 flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] text-zinc-900 dark:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon && (
            <span className="material-symbols-outlined text-base">{selectedOption.icon}</span>
          )}
          {selectedOption?.label || 'Select option'}
        </span>
        <span
          className={`material-symbols-outlined text-base transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden"
          role="listbox"
        >
          <ul className="space-y-0">
            {options.map((option, index) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                    value === option.value
                      ? 'bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5'
                  } ${index < options.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''}`}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.icon && (
                    <span className="material-symbols-outlined text-base">{option.icon}</span>
                  )}
                  {option.label}
                  {value === option.value && (
                    <span className="material-symbols-outlined text-base ml-auto">check</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
