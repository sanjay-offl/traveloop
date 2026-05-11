// Typed DB interfaces matching the enterprise schema (migration 20240101000002)
export type TripVisibility  = 'private' | 'public' | 'shared'
export type TripStatus      = 'planning' | 'active' | 'completed' | 'archived'
export type ActivityCategory = 'sightseeing'|'food'|'adventure'|'transport'|'accommodation'|'shopping'|'culture'|'nightlife'|'wellness'|'other'
export type ExpenseType     = 'flights'|'accommodation'|'food'|'transport'|'activities'|'shopping'|'other'
export type PackingCategory = 'clothing'|'electronics'|'documents'|'toiletries'|'medical'|'gear'|'other'

export interface Profile {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
  bio: string | null
  location: string | null
  preferences: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Trip {
  id: string
  user_id: string
  title: string
  description: string | null
  cover_image: string | null
  start_date: string | null
  end_date: string | null
  visibility: TripVisibility
  status: TripStatus
  total_budget: number
  created_at: string
  updated_at: string
  trip_stops?: TripStop[]
  expenses?: Expense[]
}

export interface TripStop {
  id: string
  trip_id: string
  city_name: string
  country: string
  arrival_date: string | null
  departure_date: string | null
  order_index: number
  cover_image: string | null
  notes: string | null
  created_at: string
  activities?: Activity[]
}

export interface Activity {
  id: string
  stop_id: string
  title: string
  category: ActivityCategory
  cost: number
  duration: number | null
  notes: string | null
  start_time: string | null
  icon: string
  color: string
  created_at: string
  updated_at: string
}

// Enterprise schema: expenses link directly to trip_id (no budgets table)
export interface Expense {
  id: string
  trip_id: string
  type: ExpenseType
  amount: number
  description: string
  date: string
  created_at: string
}

export interface PackingItem {
  id: string
  trip_id: string
  item_name: string
  category: PackingCategory
  is_packed: boolean
  created_at: string
}

export interface TripNote {
  id: string
  trip_id: string
  stop_id: string | null
  note: string
  created_at: string
}

export interface SharedItinerary {
  id: string
  trip_id: string
  public_token: string
  created_at: string
}

export interface CommunityPost {
  id: string
  user_id: string
  title: string
  content: string | null
  tag: string
  replies_count: number
  likes_count: number
  created_at: string
  updated_at: string
  profiles?: Pick<Profile, 'full_name' | 'avatar_url'>
}

export interface NotificationItem {
  id: string
  icon: string
  color: string
  title: string
  body: string
  time: string
  unread: boolean
}
