-- Community Member Showcase — fully data-driven, no hardcoded members.
create table if not exists community_members (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references communities(id) on delete cascade,
  display_name text not null,
  username text default '',
  discord_id text default '',
  role text default '',
  bio text default '',
  image_path text,
  sort_order int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_community_members_community
  on community_members (community_id, sort_order);

-- keep updated_at fresh
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

drop trigger if exists trg_community_members_updated on community_members;
create trigger trg_community_members_updated
  before update on community_members
  for each row execute function set_updated_at();

-- RLS: public read, admin write (matches existing model)
alter table community_members enable row level security;
drop policy if exists "public_read" on community_members;
create policy "public_read" on community_members for select using (true);
drop policy if exists "admin_write" on community_members;
create policy "admin_write" on community_members
  for all to authenticated using (true) with check (true);
