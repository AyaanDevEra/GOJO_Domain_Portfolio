-- Public read, admin-only write. Apply uniformly to all content tables.
do $$
declare t text;
begin
  foreach t in array array[
    'site_settings','domain_lore','characters','audio_assets','achievements',
    'project_categories','projects','statistics','skills','communities',
    'gallery_items','announcements'
  ]
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists "public_read" on %I;', t);
    execute format('create policy "public_read" on %I for select using (true);', t);
    execute format('drop policy if exists "admin_write" on %I;', t);
    execute format($f$create policy "admin_write" on %I
      for all to authenticated using (true) with check (true);$f$, t);
  end loop;
end $$;

-- NOTE: tighten admin_write to a specific role/email claim in production, e.g.:
--   using (auth.jwt() ->> 'email' = 'you@example.com')
