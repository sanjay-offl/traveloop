-- 00001_initial_schema.sql

-- ====================================================================================
-- ENUMS
-- ====================================================================================
CREATE TYPE trip_status AS ENUM ('planning', 'active', 'completed', 'archived');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE budget_category AS ENUM ('Flights', 'Hotels', 'Food & Dining', 'Activities', 'Transport', 'Other');

-- ====================================================================================
-- PROFILES TABLE
-- ====================================================================================
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- ====================================================================================
-- TRIPS TABLE
-- ====================================================================================
CREATE TABLE public.trips (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  destination text NOT NULL,
  start_date date,
  end_date date,
  cover_image_url text,
  status trip_status DEFAULT 'planning',
  budget numeric(10, 2) DEFAULT 0.00,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_trips_user_id ON public.trips(user_id);
CREATE INDEX idx_trips_status ON public.trips(status);

-- RLS: Trips
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own trips" 
  ON public.trips FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips" 
  ON public.trips FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" 
  ON public.trips FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" 
  ON public.trips FOR DELETE 
  USING (auth.uid() = user_id);

-- ====================================================================================
-- BUDGETS & EXPENSES TABLES
-- ====================================================================================
CREATE TABLE public.budgets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id uuid REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  total_budget numeric(10, 2) NOT NULL DEFAULT 0.00,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(trip_id)
);

CREATE TABLE public.expenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  budget_id uuid REFERENCES public.budgets(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  amount numeric(10, 2) NOT NULL,
  category budget_category NOT NULL,
  date date DEFAULT current_date,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Budgets & Expenses
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage budgets for their trips" 
  ON public.budgets FOR ALL 
  USING (
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage expenses for their budgets" 
  ON public.expenses FOR ALL 
  USING (
    budget_id IN (
      SELECT b.id FROM public.budgets b
      JOIN public.trips t ON b.trip_id = t.id
      WHERE t.user_id = auth.uid()
    )
  );

-- ====================================================================================
-- PACKING ITEMS (Checklist)
-- ====================================================================================
CREATE TABLE public.packing_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id uuid REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  is_packed boolean DEFAULT false,
  priority priority_level DEFAULT 'medium',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Packing Items
ALTER TABLE public.packing_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage packing items for their trips" 
  ON public.packing_items FOR ALL 
  USING (
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
  );

-- ====================================================================================
-- ITINERARIES & ACTIVITIES
-- ====================================================================================
CREATE TABLE public.itinerary_days (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id uuid REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  label text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(trip_id, date)
);

CREATE TABLE public.activities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  day_id uuid REFERENCES public.itinerary_days(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  location text,
  start_time time without time zone,
  end_time time without time zone,
  icon text DEFAULT 'map',
  color text DEFAULT '#3B82F6',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Itineraries & Activities
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage itinerary days for their trips" 
  ON public.itinerary_days FOR ALL 
  USING (
    trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage activities for their itineraries" 
  ON public.activities FOR ALL 
  USING (
    day_id IN (
      SELECT i.id FROM public.itinerary_days i
      JOIN public.trips t ON i.trip_id = t.id
      WHERE t.user_id = auth.uid()
    )
  );

-- ====================================================================================
-- COMMUNITY POSTS
-- ====================================================================================
CREATE TABLE public.community_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text,
  tag text,
  replies_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Community Posts
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community posts are viewable by everyone" 
  ON public.community_posts FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own community posts" 
  ON public.community_posts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own community posts" 
  ON public.community_posts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own community posts" 
  ON public.community_posts FOR DELETE 
  USING (auth.uid() = user_id);

-- ====================================================================================
-- TRIGGERS
-- ====================================================================================
-- Auto-update updated_at timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON public.budgets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Auto-create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ====================================================================================
-- REALTIME
-- ====================================================================================
-- Enable realtime on tables
alter publication supabase_realtime add table public.trips;
alter publication supabase_realtime add table public.budgets;
alter publication supabase_realtime add table public.expenses;
alter publication supabase_realtime add table public.packing_items;
alter publication supabase_realtime add table public.activities;
alter publication supabase_realtime add table public.community_posts;
