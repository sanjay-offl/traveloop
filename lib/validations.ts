// Central Zod schemas for all Traveloop forms
import { z } from 'zod'

// ─── Auth ───────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email:     z.string().email('Enter a valid email address'),
  password:  z.string().min(8, 'Password must be at least 8 characters'),
  confirm:   z.string(),
}).refine(d => d.password === d.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
})
export type RegisterInput = z.infer<typeof registerSchema>

// ─── Trips ──────────────────────────────────────────────
export const tripSchema = z.object({
  title:        z.string().min(2, 'Trip name must be at least 2 characters').max(100),
  description:  z.string().max(500).optional(),
  start_date:   z.string().optional(),
  end_date:     z.string().optional(),
  total_budget: z.coerce.number().min(0, 'Budget cannot be negative').optional(),
  visibility:   z.enum(['private', 'public', 'shared']).default('private'),
}).refine(d => {
  if (d.start_date && d.end_date) return d.end_date >= d.start_date
  return true
}, { message: 'End date must be after start date', path: ['end_date'] })
export type TripInput = z.infer<typeof tripSchema>

// ─── Trip Stops ─────────────────────────────────────────
export const tripStopSchema = z.object({
  city_name:      z.string().min(2, 'City name is required'),
  country:        z.string().min(2, 'Country is required'),
  arrival_date:   z.string().optional(),
  departure_date: z.string().optional(),
  notes:          z.string().max(500).optional(),
})
export type TripStopInput = z.infer<typeof tripStopSchema>

// ─── Activities ─────────────────────────────────────────
export const activitySchema = z.object({
  title:    z.string().min(2, 'Activity name is required').max(100),
  category: z.enum(['sightseeing','food','adventure','transport','accommodation','shopping','culture','nightlife','wellness','other']).default('other'),
  cost:     z.coerce.number().min(0).default(0),
  duration: z.coerce.number().min(1).optional(),
  notes:    z.string().max(300).optional(),
})
export type ActivityInput = z.infer<typeof activitySchema>

// ─── Expenses ───────────────────────────────────────────
export const expenseSchema = z.object({
  title:    z.string().min(2, 'Title is required').max(100),
  amount:   z.coerce.number().min(0.01, 'Amount must be greater than 0'),
  category: z.enum(['Flights','Hotels','Food & Dining','Activities','Transport','Other']).default('Other'),
  date:     z.string().optional(),
})
export type ExpenseInput = z.infer<typeof expenseSchema>

// ─── Packing Items ──────────────────────────────────────
export const packingItemSchema = z.object({
  item_name: z.string().min(1, 'Item name is required').max(80),
  category:  z.enum(['clothing','electronics','documents','toiletries','medical','gear','other']).default('other'),
})
export type PackingItemInput = z.infer<typeof packingItemSchema>

// ─── Trip Notes ─────────────────────────────────────────
export const tripNoteSchema = z.object({
  note: z.string().min(5, 'Note must be at least 5 characters').max(2000),
})
export type TripNoteInput = z.infer<typeof tripNoteSchema>

// ─── Community Post ─────────────────────────────────────
export const communityPostSchema = z.object({
  title:   z.string().min(5, 'Title must be at least 5 characters').max(150),
  content: z.string().max(1000).optional(),
  tag:     z.string().min(1, 'Tag is required').max(30),
})
export type CommunityPostInput = z.infer<typeof communityPostSchema>
