-- ============================================================
-- SEED: Realistic demo data for Traveloop
-- Run AFTER schema migration
-- ============================================================

-- NOTE: Auth users must already exist via Supabase Auth
-- This seeds profiles + travel data for: Sanjay, Mohammed Saif, Nithya Shree, Dhanu Shree
-- Replace UUIDs with your actual auth.users UUIDs if testing with real auth accounts

-- ============================================================
-- DEMO PROFILES (upsert so it's idempotent)
-- ============================================================
INSERT INTO public.profiles (id, full_name, email, bio, location, avatar_url) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Sanjay',          'sanjay@traveloop.app',       'Backpacker & photography enthusiast. 12 countries and counting!',      'Coimbatore, India',  NULL),
  ('00000000-0000-0000-0000-000000000002', 'Mohammed Saif',   'saif@traveloop.app',         'Budget traveller. Love authentic street food & offbeat destinations.',  'Chennai, India',     NULL),
  ('00000000-0000-0000-0000-000000000003', 'Nithya Shree',    'nithya@traveloop.app',       'Solo female traveller. Wellness retreats & beach escapes.',            'Bangalore, India',   NULL),
  ('00000000-0000-0000-0000-000000000004', 'Dhanu Shree',     'dhanu@traveloop.app',        'Adventure seeker. Trekking, diving, and chasing sunsets.',            'Chennai, India',     NULL)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, bio = EXCLUDED.bio;

-- ============================================================
-- SANJAY's TRIPS
-- ============================================================
WITH t1 AS (
  INSERT INTO public.trips (id, user_id, title, description, start_date, end_date, status, visibility, total_budget)
  VALUES (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Goa Beach Break',
    'A relaxing week along the golden coastline of Goa. Sun, sand, and seafood.',
    '2025-06-10', '2025-06-17', 'planning', 'private', 18000
  ) ON CONFLICT (id) DO NOTHING RETURNING id
)
INSERT INTO public.trip_stops (trip_id, city_name, country, arrival_date, departure_date, order_index, notes) VALUES
  ('10000000-0000-0000-0000-000000000001', 'North Goa', 'India', '2025-06-10', '2025-06-13', 1, 'Stay near Calangute Beach'),
  ('10000000-0000-0000-0000-000000000001', 'South Goa', 'India', '2025-06-13', '2025-06-17', 2, 'Palolem Beach — quieter and more scenic')
ON CONFLICT DO NOTHING;

WITH t2 AS (
  INSERT INTO public.trips (id, user_id, title, description, start_date, end_date, status, visibility, total_budget)
  VALUES (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Singapore & Bali Escape',
    'Modern Singapore followed by the spiritual tranquility of Bali.',
    '2025-08-01', '2025-08-14', 'planning', 'private', 85000
  ) ON CONFLICT (id) DO NOTHING RETURNING id
)
INSERT INTO public.trip_stops (trip_id, city_name, country, arrival_date, departure_date, order_index) VALUES
  ('10000000-0000-0000-0000-000000000002', 'Singapore', 'Singapore', '2025-08-01', '2025-08-05', 1),
  ('10000000-0000-0000-0000-000000000002', 'Bali',      'Indonesia', '2025-08-05', '2025-08-14', 2)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SAIF's TRIPS
-- ============================================================
INSERT INTO public.trips (id, user_id, title, description, start_date, end_date, status, visibility, total_budget)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'Dubai Weekend Getaway',
  'Quick 4-day luxury escape to Dubai. Burj Khalifa, gold souk, desert safari.',
  '2025-07-04', '2025-07-08', 'planning', 'private', 45000
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.trip_stops (trip_id, city_name, country, arrival_date, departure_date, order_index) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Dubai', 'UAE', '2025-07-04', '2025-07-08', 1)
ON CONFLICT DO NOTHING;

-- ============================================================
-- NITHYA's TRIPS
-- ============================================================
INSERT INTO public.trips (id, user_id, title, description, start_date, end_date, status, visibility, total_budget)
VALUES (
  '30000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000003',
  'Ooty & Coimbatore Hill Tour',
  'A refreshing getaway through the Nilgiri hills and Coimbatore's heritage.',
  '2025-05-20', '2025-05-25', 'completed', 'private', 12000
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.trip_stops (trip_id, city_name, country, arrival_date, departure_date, order_index) VALUES
  ('30000000-0000-0000-0000-000000000001', 'Coimbatore', 'India', '2025-05-20', '2025-05-22', 1),
  ('30000000-0000-0000-0000-000000000001', 'Ooty',        'India', '2025-05-22', '2025-05-25', 2)
ON CONFLICT DO NOTHING;

-- ============================================================
-- DHANU's TRIPS
-- ============================================================
INSERT INTO public.trips (id, user_id, title, description, start_date, end_date, status, visibility, total_budget)
VALUES (
  '40000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000004',
  'Bangalore to Goa Road Trip',
  'Epic road trip from Bangalore through the Western Ghats to Goa. Music, mountains, and the sea.',
  '2025-09-12', '2025-09-20', 'planning', 'public', 22000
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.trip_stops (trip_id, city_name, country, arrival_date, departure_date, order_index) VALUES
  ('40000000-0000-0000-0000-000000000001', 'Bangalore', 'India', '2025-09-12', '2025-09-13', 1),
  ('40000000-0000-0000-0000-000000000001', 'Hubli',     'India', '2025-09-13', '2025-09-14', 2),
  ('40000000-0000-0000-0000-000000000001', 'Goa',       'India', '2025-09-14', '2025-09-20', 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- ACTIVITIES for Sanjay's Goa trip (North Goa stop)
-- ============================================================
WITH stop AS (SELECT id FROM public.trip_stops WHERE trip_id='10000000-0000-0000-0000-000000000001' AND city_name='North Goa' LIMIT 1)
INSERT INTO public.activities (stop_id, title, category, cost, duration, notes, icon, color) VALUES
  ((SELECT id FROM stop), 'Sunset at Calangute Beach',  'sightseeing',    0,    90,  'Golden hour photos — arrive by 6pm',          'wb_twilight', '#F59E0B'),
  ((SELECT id FROM stop), 'Baga Night Market',          'shopping',       800,  180, 'Artisan crafts, street food, live music',      'storefront',  '#8B5CF6'),
  ((SELECT id FROM stop), 'Water sports at Baga',       'adventure',      2500, 120, 'Parasailing + jet ski combo',                 'surfing',     '#3B82F6'),
  ((SELECT id FROM stop), 'Brunch at Infantaria Cafe',  'food',           600,  60,  'Famous for croissants and fresh juices',       'restaurant',  '#10B981')
ON CONFLICT DO NOTHING;

-- ============================================================
-- EXPENSES for Sanjay's Goa trip
-- ============================================================
INSERT INTO public.expenses (trip_id, type, amount, description, date) VALUES
  ('10000000-0000-0000-0000-000000000001', 'flights',       5200,  'IndiGo — CBE to GOI return',       '2025-05-01'),
  ('10000000-0000-0000-0000-000000000001', 'accommodation', 6400,  'Airbnb near Baga Beach (4 nights)', '2025-05-01'),
  ('10000000-0000-0000-0000-000000000001', 'food',          1800,  'Restaurants & cafes budget',        '2025-05-01'),
  ('10000000-0000-0000-0000-000000000001', 'activities',    2500,  'Water sports package',              '2025-05-02'),
  ('10000000-0000-0000-0000-000000000001', 'transport',     900,   'Bike rental for 4 days',            '2025-05-02'),
  ('10000000-0000-0000-0000-000000000001', 'shopping',      800,   'Baga night market',                 '2025-05-03')
ON CONFLICT DO NOTHING;

-- ============================================================
-- PACKING LIST for Sanjay's Goa trip
-- ============================================================
INSERT INTO public.packing_items (trip_id, item_name, category, is_packed) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Passport & ID',          'documents',   true),
  ('10000000-0000-0000-0000-000000000001', 'Sunscreen SPF 50',       'toiletries',  true),
  ('10000000-0000-0000-0000-000000000001', 'Swim shorts x3',         'clothing',    true),
  ('10000000-0000-0000-0000-000000000001', 'Sandals',                'clothing',    false),
  ('10000000-0000-0000-0000-000000000001', 'GoPro + charger',        'electronics', false),
  ('10000000-0000-0000-0000-000000000001', 'Travel adapter',         'electronics', true),
  ('10000000-0000-0000-0000-000000000001', 'Motion sickness tablets','medical',     false),
  ('10000000-0000-0000-0000-000000000001', 'Reusable water bottle',  'gear',        true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- JOURNAL ENTRIES for Sanjay's Goa trip
-- ============================================================
WITH stop AS (SELECT id FROM public.trip_stops WHERE trip_id='10000000-0000-0000-0000-000000000001' AND city_name='North Goa' LIMIT 1)
INSERT INTO public.trip_notes (trip_id, stop_id, note) VALUES
  ('10000000-0000-0000-0000-000000000001', (SELECT id FROM stop), 'The sunset at Calangute was absolutely surreal — warm orange skies melting into the Arabian Sea. The water sports package was totally worth it!'),
  ('10000000-0000-0000-0000-000000000001', (SELECT id FROM stop), 'Picked up a beautiful handmade lamp at the Baga night market. The live music was incredible — a local band playing Konkani folk songs.')
ON CONFLICT DO NOTHING;

-- ============================================================
-- COMMUNITY POSTS
-- ============================================================
INSERT INTO public.community_posts (user_id, title, tag, content, replies_count, likes_count) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Best hidden beaches in North Goa 🏖️',            'Goa',       'After 3 trips to Goa, here are my top 5 secret beaches that most tourists miss...', 12, 47),
  ('00000000-0000-0000-0000-000000000002', 'Dubai on a budget — is it actually possible?',     'Budget',    'Flew on Air Arabia, stayed in Deira, skipped the malls. Full breakdown inside.', 8,  31),
  ('00000000-0000-0000-0000-000000000003', 'Solo female travel in Bali — safety tips 2025',    'Safety',    'Just returned from 2 weeks solo in Bali. Here is everything you need to know.', 21, 89),
  ('00000000-0000-0000-0000-000000000004', 'Bangalore to Goa road trip — complete route guide','Road Trip', 'Did this in September. Sharing my full route, stays, and pitstops.', 6,  22),
  ('00000000-0000-0000-0000-000000000001', 'Packing light for a 2-week Asia trip ✈️',          'Packing',   'Carry-on only for 14 days in Singapore + Bali. Here is exactly what I packed.', 15, 63),
  ('00000000-0000-0000-0000-000000000003', 'Ooty in summer — worth it or overhyped?',           'India',     'Went in May during peak summer. Crowds were manageable and the hills were green!', 9, 28)
ON CONFLICT DO NOTHING;
