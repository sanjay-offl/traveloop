-- 00002_storage_setup.sql

-- Insert storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('trip-covers', 'trip-covers', true)
ON CONFLICT (id) DO NOTHING;

-- RLS: Avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.uid() = owner
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND 
    auth.uid() = owner
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND 
    auth.uid() = owner
  );

-- RLS: Trip Covers
CREATE POLICY "Trip covers are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'trip-covers');

CREATE POLICY "Users can upload trip covers"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'trip-covers' AND 
    auth.uid() = owner
  );

CREATE POLICY "Users can update their trip covers"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'trip-covers' AND 
    auth.uid() = owner
  );

CREATE POLICY "Users can delete their trip covers"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'trip-covers' AND 
    auth.uid() = owner
  );
