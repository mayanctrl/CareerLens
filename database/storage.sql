-- Storage Configuration for CareerLens

-- Note: These commands are pseudo-SQL for Supabase Storage.
-- In Supabase, you typically create buckets via the UI or the Supabase JS client.
-- If using raw SQL (pg_query), it interacts with the storage schema.

INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('resume-pdfs', 'resume-pdfs', false),
('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies

-- Avatars Bucket
CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

CREATE POLICY "Anyone can upload an avatar."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'avatars' );

CREATE POLICY "Users can update their own avatars."
  ON storage.objects FOR UPDATE
  USING ( auth.uid() = owner )
  WITH CHECK ( bucket_id = 'avatars' );

-- Resume PDFs Bucket
CREATE POLICY "Users can view their own resumes."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'resume-pdfs' AND auth.uid() = owner );

CREATE POLICY "Users can upload their own resumes."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'resume-pdfs' AND auth.uid() = owner );

CREATE POLICY "Users can update their own resumes."
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'resume-pdfs' AND auth.uid() = owner );

CREATE POLICY "Users can delete their own resumes."
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'resume-pdfs' AND auth.uid() = owner );
