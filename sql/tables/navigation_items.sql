create table if not exists public.navigation_items (
  id uuid primary key default uuid_generate_v4(),
  label_fr text not null,
  label_ar text,
  href text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.navigation_items enable row level security;

drop policy if exists "Public read navigation_items" on public.navigation_items;
drop policy if exists "Admin full access navigation_items" on public.navigation_items;

create policy "Public read navigation_items" on public.navigation_items
  for select
  using (is_active = true);

create policy "Admin full access navigation_items" on public.navigation_items
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into public.navigation_items (label_fr, label_ar, href, sort_order, is_active) values
  ('Home', 'الرئيسية', '/', 1, true),
  ('About Us', 'من نحن', '/heritage', 2, true),
  ('Collection', 'المجموعة', '/#collection', 3, true),
  ('Homme', 'رجال', '/homme', 4, true),
  ('Femme', 'نساء', '/femme', 5, true)
on conflict do nothing;
