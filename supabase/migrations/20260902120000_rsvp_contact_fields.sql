-- The reference RSVP form (section 5) collects phone, address and email alongside
-- name/attendance. Additive and nullable: existing rows and the PRD's original
-- rsvps(name, attendance, party_size) contract are untouched.
alter table public.rsvps
  add column if not exists country_code text,
  add column if not exists phone_number text,
  add column if not exists address text,
  add column if not exists email text;
