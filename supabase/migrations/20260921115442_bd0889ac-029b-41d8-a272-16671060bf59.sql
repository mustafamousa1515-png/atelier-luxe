CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_type text NOT NULL CHECK (appointment_type IN ('Private consultation', 'Fitting appointment', 'Virtual consultation', 'Collection viewing')),
  requested_date date NOT NULL,
  requested_time time NOT NULL,
  guest_name text NOT NULL CHECK (char_length(guest_name) BETWEEN 2 AND 100),
  guest_email text NOT NULL CHECK (char_length(guest_email) <= 255),
  guest_phone text CHECK (guest_phone IS NULL OR char_length(guest_phone) <= 40),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 1000),
  status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'confirmed', 'declined')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.appointments TO anon, authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can request appointments" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (status = 'requested');

CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL CHECK (char_length(sender_name) BETWEEN 2 AND 100),
  sender_email text NOT NULL CHECK (char_length(sender_email) <= 255),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 2 AND 120),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 1500),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_requests TO anon, authenticated;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can send private enquiries" ON public.contact_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER contact_requests_updated_at BEFORE UPDATE ON public.contact_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();