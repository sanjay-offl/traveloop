-- ============================================================
-- MIGRATION: 00002_enterprise_schema.sql
-- Production-ready normalized relational schema for Traveloop
-- ============================================================

-- Drop old tables in dependency order if they exist
DROP TABLE IF EXISTS public.shared_itineraries CASCADE;
DROP TABLE IF EXISTS public.trip_notes CASCADE;
DROP TABLE IF EXISTS public.packing_items CASCADE;
DROP TABLE IF EXISTS public.expenses CASCADE;
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.itinerary_days CASCADE;
DROP TABLE IF EXISTS public.community_posts CASCADE;
DROP TABLE IF EXISTS public.budgets CASCADE;
DROP TABLE IF EXISTS public.trip_stops CASCADE;
DROP TABLE IF EXISTS public.trips CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TYPE IF EXISTS trip_visibility CASCADE;
DROP TYPE IF EXISTS trip_status CASCADE;
DROP TYPE IF EXISTS activity_category CASCADE;
DROP TYPE IF EXISTS expense_type CASCADE;
DROP TYPE IF EXISTS packing_category CASCADE;

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE trip_visibility AS ENUM ('private', 'public', 'shared');
CREATE TYPE trip_status     AS ENUM ('planning', 'active', 'completed', 'archived');
CREATE TYPE activity_category AS ENUM ('sightseeing','food','adventure','transport','accommodation','shopping','culture','nightlife','wellness','other');
CREATE TYPE expense_type    AS ENUM ('flights','accommodation','food','transport','activities','shopping','other');
CREATE TYPE packing_category AS ENUM ('clothing','electronics','documents','toiletries','medical','gear','other');

-- ============================================================
-- PROFILES  (mirrors auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text NOT NULL DEFAULT '',
  email       text NOT NULL DEFAULT '',
  avatar_url  text,
  bio         text,
  location    text,
  preferences jsonb    NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_email ON public.profiles(email);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_all"  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own"  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own"  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- TRIPS
-- ============================================================
CREATE TABLE public.trips (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title        text NOT NULL,
  description  text,
  cover_image  text,
  start_date   date,
  end_date     date,
  visibility   trip_visibility NOT NULL DEFAULT 'private',
  status       trip_status     NOT NULL DEFAULT 'planning',
  total_budget numeric(12,2)   NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_trips_user_id  ON public.trips(user_id);
CREATE INDEX idx_trips_status   ON public.trips(status);
CREATE INDEX idx_trips_dates    ON public.trips(start_date, end_date);

ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trips_select" ON public.trips FOR SELECT
  USING (auth.uid() = user_id OR visibility = 'public');
CREATE POLICY "trips_insert" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "trips_update" ON public.trips FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "trips_delete" ON public.trips FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TRIP STOPS  (ordered destinations within a trip)
-- ============================================================
CREATE TABLE public.trip_stops (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id        uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  city_name      text NOT NULL,
  country        text NOT NULL,
  arrival_date   date,
  departure_date date,
  order_index    integer NOT NULL DEFAULT 0,
  cover_image    text,
  notes          text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_trip_stops_trip_id     ON public.trip_stops(trip_id);
CREATE INDEX idx_trip_stops_order       ON public.trip_stops(trip_id, order_index);

ALTER TABLE public.trip_stops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trip_stops_all" ON public.trip_stops FOR ALL
  USING (trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()));

-- ============================================================
-- ACTIVITIES  (per stop)
-- ============================================================
CREATE TABLE public.activities (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stop_id     uuid NOT NULL REFERENCES public.trip_stops(id) ON DELETE CASCADE,
  title       text NOT NULL,
  category    activity_category NOT NULL DEFAULT 'other',
  cost        numeric(10,2)     NOT NULL DEFAULT 0,
  duration    integer, -- in minutes
  notes       text,
  start_time  time,
  icon        text DEFAULT 'map',
  color       text DEFAULT '#3B82F6',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_activities_stop_id ON public.activities(stop_id);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "activities_all" ON public.activities FOR ALL
  USING (
    stop_id IN (
      SELECT s.id FROM public.trip_stops s
      JOIN public.trips t ON s.trip_id = t.id
      WHERE t.user_id = auth.uid()
    )
  );

-- ============================================================
-- EXPENSES  (per trip)
-- ============================================================
CREATE TABLE public.expenses (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  type        expense_type NOT NULL DEFAULT 'other',
  amount      numeric(10,2) NOT NULL,
  description text NOT NULL,
  date        date DEFAULT current_date,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_expenses_trip_id ON public.expenses(trip_id);
CREATE INDEX idx_expenses_type    ON public.expenses(type);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "expenses_all" ON public.expenses FOR ALL
  USING (trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()));

-- ============================================================
-- PACKING ITEMS  (per trip)
-- ============================================================
CREATE TABLE public.packing_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  item_name   text NOT NULL,
  category    packing_category NOT NULL DEFAULT 'other',
  is_packed   boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_packing_items_trip_id ON public.packing_items(trip_id);

ALTER TABLE public.packing_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "packing_items_all" ON public.packing_items FOR ALL
  USING (trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()));

-- ============================================================
-- TRIP NOTES / JOURNAL  (per trip, optionally per stop)
-- ============================================================
CREATE TABLE public.trip_notes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id    uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  stop_id    uuid REFERENCES public.trip_stops(id) ON DELETE SET NULL,
  note       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_trip_notes_trip_id ON public.trip_notes(trip_id);

ALTER TABLE public.trip_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trip_notes_all" ON public.trip_notes FOR ALL
  USING (trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()));

-- ============================================================
-- SHARED ITINERARIES  (public sharing via token)
-- ============================================================
CREATE TABLE public.shared_itineraries (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id      uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  public_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE(trip_id)
);

ALTER TABLE public.shared_itineraries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "shared_itineraries_select" ON public.shared_itineraries FOR SELECT USING (true);
CREATE POLICY "shared_itineraries_insert" ON public.shared_itineraries FOR INSERT
  WITH CHECK (trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()));
CREATE POLICY "shared_itineraries_delete" ON public.shared_itineraries FOR DELETE
  USING (trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()));

-- ============================================================
-- COMMUNITY POSTS
-- ============================================================
CREATE TABLE public.community_posts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title        text NOT NULL,
  content      text,
  tag          text NOT NULL DEFAULT 'General',
  replies_count integer NOT NULL DEFAULT 0,
  likes_count   integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_community_posts_user_id    ON public.community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at DESC);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "community_select"  ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "community_insert"  ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "community_update"  ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "community_delete"  ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TRIGGERS — auto updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_profiles_updated_at       BEFORE UPDATE ON public.profiles        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_trips_updated_at          BEFORE UPDATE ON public.trips            FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_activities_updated_at     BEFORE UPDATE ON public.activities       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_community_updated_at      BEFORE UPDATE ON public.community_posts  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TRIGGER — auto-create profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles(id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- REALTIME
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.trips;
ALTER PUBLICATION supabase_realtime ADD TABLE public.trip_stops;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.packing_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
