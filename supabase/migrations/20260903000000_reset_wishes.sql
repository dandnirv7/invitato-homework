-- Reset wishes data: truncate all test wishes inserted during development.
-- Invitato PRD requires empty wishes render as honest empty state; no fake seeds.
-- Run via Supabase Dashboard SQL Editor or `supabase db push` with service_role.
truncate table public.wishes restart identity cascade;
