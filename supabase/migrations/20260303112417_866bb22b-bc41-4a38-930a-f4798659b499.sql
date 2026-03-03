
-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  aadhaar_number TEXT,
  pan_number TEXT,
  voter_id TEXT,
  mobile TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  district TEXT,
  assembly_constituency TEXT,
  panchayat_ward TEXT,
  pincode TEXT,
  full_address TEXT,
  occupation TEXT,
  education TEXT,
  volunteer_interest TEXT,
  photo_url TEXT,
  id_proof_url TEXT,
  pan_card_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration form)
CREATE POLICY "Anyone can submit registration"
ON public.registrations
FOR INSERT
WITH CHECK (true);

-- Only allow reading own data (no auth needed for insert-only)
CREATE POLICY "No public read"
ON public.registrations
FOR SELECT
USING (false);

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('registration-uploads', 'registration-uploads', true);

-- Allow anyone to upload to the bucket
CREATE POLICY "Anyone can upload registration files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'registration-uploads');

-- Allow public read of uploaded files
CREATE POLICY "Public read registration files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'registration-uploads');
