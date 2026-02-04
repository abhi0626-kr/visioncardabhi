-- Vision board schema for images, videos, theories, and wishes

do $$ 
begin
  if not exists (select 1 from pg_type where typname = 'vision_category') then
    create type vision_category as enum (
      'career',
      'health',
      'travel',
      'creativity',
      'relationships',
      'personal'
    );
  end if;
end $$;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists vision_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  src text not null,
  alt text not null,
  category vision_category not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists vision_videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  url text not null,
  title text not null,
  thumbnail text,
  category vision_category not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists vision_theories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  content text not null,
  author text,
  category vision_category not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists vision_wishes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  description text,
  completed boolean not null default false,
  progress int,
  category vision_category not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vision_wishes_progress_range check (progress is null or (progress >= 0 and progress <= 100))
);

create trigger set_vision_images_updated_at
before update on vision_images
for each row execute function set_updated_at();

create trigger set_vision_videos_updated_at
before update on vision_videos
for each row execute function set_updated_at();

create trigger set_vision_theories_updated_at
before update on vision_theories
for each row execute function set_updated_at();

create trigger set_vision_wishes_updated_at
before update on vision_wishes
for each row execute function set_updated_at();

alter table vision_images enable row level security;
alter table vision_videos enable row level security;
alter table vision_theories enable row level security;
alter table vision_wishes enable row level security;

-- Read: public (user_id is null) or owner
create policy "vision_images_select" on vision_images
for select using (user_id is null or auth.uid() = user_id);

create policy "vision_videos_select" on vision_videos
for select using (user_id is null or auth.uid() = user_id);

create policy "vision_theories_select" on vision_theories
for select using (user_id is null or auth.uid() = user_id);

create policy "vision_wishes_select" on vision_wishes
for select using (user_id is null or auth.uid() = user_id);

-- Write: allow owner, or public rows for demo
create policy "vision_images_insert" on vision_images
for insert with check (user_id is null or auth.uid() = user_id);

create policy "vision_videos_insert" on vision_videos
for insert with check (user_id is null or auth.uid() = user_id);

create policy "vision_theories_insert" on vision_theories
for insert with check (user_id is null or auth.uid() = user_id);

create policy "vision_wishes_insert" on vision_wishes
for insert with check (user_id is null or auth.uid() = user_id);

create policy "vision_images_update" on vision_images
for update using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "vision_videos_update" on vision_videos
for update using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "vision_theories_update" on vision_theories
for update using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "vision_wishes_update" on vision_wishes
for update using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "vision_images_delete" on vision_images
for delete using (user_id is null or auth.uid() = user_id);

create policy "vision_videos_delete" on vision_videos
for delete using (user_id is null or auth.uid() = user_id);

create policy "vision_theories_delete" on vision_theories
for delete using (user_id is null or auth.uid() = user_id);

create policy "vision_wishes_delete" on vision_wishes
for delete using (user_id is null or auth.uid() = user_id);

-- Optional seed data (public rows)
insert into vision_images (src, alt, category)
values
  ('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400', 'Mountain summit at golden hour', 'travel'),
  ('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400', 'Minimalist workspace sanctuary', 'career'),
  ('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1400', 'Morning meditation practice', 'health');

insert into vision_videos (url, title, category)
values
  ('https://www.youtube.com/embed/LXb3EKWsInQ', 'Morning Motivation', 'personal');

insert into vision_theories (title, content, author, category)
values
  ('The Compound Effect', 'Small, seemingly insignificant steps completed consistently over time will create a radical difference.', 'Darren Hardy', 'personal'),
  ('Amor Fati', 'Love your fate. Not merely bear what is necessary, but love it.', 'Friedrich Nietzsche', 'personal'),
  ('The Map Is Not The Territory', 'Our perception of reality is not reality itself but our own version of it, or our "map".', 'Alfred Korzybski', 'creativity');

insert into vision_wishes (title, description, category, completed, progress)
values
  ('Run a marathon', 'Complete a full 42km marathon', 'health', false, 35),
  ('Learn a new language', 'Become conversational in Japanese', 'personal', false, 20),
  ('Visit Japan', 'Experience the culture and beauty of Japan', 'travel', false, 10),
  ('Build a side project', 'Launch a profitable side business', 'career', true, 100);
