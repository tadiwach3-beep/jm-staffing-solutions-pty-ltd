
-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Booking requests
CREATE TABLE public.booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  guests TEXT,
  staff_needed TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit booking request"
  ON public.booking_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
