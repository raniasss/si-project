-- 1. Ajouter la contrainte UNIQUE manquante
ALTER TABLE public.technicians
ADD CONSTRAINT technicians_email_unique UNIQUE (email);

-- 2. Insérer les techniciens
INSERT INTO public.technicians (full_name, speciality, email, phone, available) VALUES
  ('Yacine Hamidi',  'Hardware',          'y.hamidi@it-fix.dz',  '+213 550 11 22 33', true),
  ('Sonia Benali',   'Network',           's.benali@it-fix.dz',  '+213 661 44 55 66', true),
  ('Karim Mebarki',  'Software',          'k.mebarki@it-fix.dz', '+213 770 77 88 99', true),
  ('Amina Cherifi',  'Cybersecurity',     'a.cherifi@it-fix.dz', '+213 550 12 34 56', true),
  ('Walid Bouzidi',  'Database',          'w.bouzidi@it-fix.dz', '+213 661 98 76 54', false),
  ('Lina Azzoug',    'Printers & Office', 'l.azzoug@it-fix.dz',  '+213 770 22 33 44', true)
ON CONFLICT (email) DO NOTHING;
