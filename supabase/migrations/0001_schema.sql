-- Domain Portfolio — full v2 schema
create extension if not exists "uuid-ossp";

create table if not exists site_settings (
  id uuid primary key default uuid_generate_v4(),
  display_name text not null default 'GOJO SATORU',
  username text not null default 'gojo_satoru.tho',
  real_name text not null default 'Gojo Khan',
  hover_image_path text,
  socials jsonb not null default '{}'::jsonb,
  audio_enabled boolean not null default false,
  master_volume float not null default 0.6
);

create table if not exists domain_lore (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  name text not null,
  description text default '',
  theme text default '',
  visual_identity text default '',
  animation_preset text not null,
  audio_preset text,
  accent_colors jsonb not null default '{}'::jsonb,
  background_assets jsonb not null default '[]'::jsonb,
  section_key text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists characters (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text default '',
  description text default '',
  primary_image_path text,
  secondary_images jsonb not null default '[]'::jsonb,
  associated_section text,
  animation_presets jsonb not null default '[]'::jsonb,
  audio_refs jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists audio_assets (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  name text not null,
  category text not null,
  file_path text,
  default_volume float not null default 0.5,
  loop boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text default '',
  category text default '',
  priority int not null default 0,
  image_path text,
  date_earned date,
  is_showcase boolean not null default false,
  is_featured boolean not null default false,
  related_section text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

create table if not exists project_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  sort_order int not null default 0
);

create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text default '',
  category_id uuid references project_categories(id) on delete set null,
  images jsonb not null default '[]'::jsonb,
  status text not null default 'planned',
  technologies jsonb not null default '[]'::jsonb,
  external_links jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

create table if not exists statistics (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  value numeric not null default 0,
  unit text,
  display_format text not null default '{value}',
  icon text,
  source text not null default 'manual',
  derived_key text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  percentage int not null default 0,
  category text,
  icon_path text,
  description text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

create table if not exists communities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text default '',
  member_count int not null default 0,
  discord_url text,
  banner_path text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

create table if not exists gallery_items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text default '',
  image_path text,
  is_animated boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

create table if not exists announcements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text default '',
  is_active boolean not null default true,
  created_at timestamptz default now()
);
