
-- Drop the broken restrictive policies
DROP POLICY IF EXISTS "Anyone can submit registration" ON public.registrations;
DROP POLICY IF EXISTS "No public read" ON public.registrations;

-- Recreate as permissive policies
CREATE POLICY "Anyone can submit registration"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "No public read"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (false);
