create extension if not exists "uuid-ossp";

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name_fr text not null,
  name_ar text not null,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.categories(id) on delete set null,
  slug text unique not null,
  name_fr text not null,
  name_ar text not null,
  description_fr text,
  description_ar text,
  price numeric(10,2) not null,
  image_url text,
  gallery jsonb default '[]',
  is_bestseller boolean default false,
  is_active boolean default true,
  stock integer default 100,
  notes_top text,
  notes_heart text,
  notes_base text,
  created_at timestamptz default now()
);

create table if not exists public.gift_sets (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name_fr text not null,
  name_ar text not null,
  description_fr text,
  description_ar text,
  price numeric(10,2) not null,
  image_url text,
  included_products jsonb default '[]',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_city text not null,
  customer_address text not null,
  note text,
  subtotal numeric(10,2) not null,
  delivery_fee numeric(10,2) not null default 35,
  total numeric(10,2) not null,
  status text not null default 'en_attente',
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null
);

create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.site_content (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value_fr text,
  value_ar text,
  value_raw text,
  updated_at timestamptz default now()
);

create table if not exists public.translations (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value_fr text not null,
  value_ar text not null
);

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

alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.gift_sets enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_content enable row level security;
alter table public.translations enable row level security;
alter table public.navigation_items enable row level security;

drop policy if exists "Public read products" on public.products;
drop policy if exists "Public read categories" on public.categories;
drop policy if exists "Public read gift_sets" on public.gift_sets;
drop policy if exists "Public read site_content" on public.site_content;
drop policy if exists "Public read translations" on public.translations;
drop policy if exists "Public insert orders" on public.orders;
drop policy if exists "Public insert order_items" on public.order_items;
drop policy if exists "Public insert contact_messages" on public.contact_messages;
drop policy if exists "Admin full access products" on public.products;
drop policy if exists "Admin full access categories" on public.categories;
drop policy if exists "Admin full access gift_sets" on public.gift_sets;
drop policy if exists "Admin read orders" on public.orders;
drop policy if exists "Admin update orders" on public.orders;
drop policy if exists "Admin read order_items" on public.order_items;
drop policy if exists "Admin read contact_messages" on public.contact_messages;
drop policy if exists "Admin update contact_messages" on public.contact_messages;
drop policy if exists "Admin update site_content" on public.site_content;
drop policy if exists "Admin update translations" on public.translations;
drop policy if exists "Public read navigation_items" on public.navigation_items;
drop policy if exists "Admin full access navigation_items" on public.navigation_items;

create policy "Public read products" on public.products for select using (is_active = true or auth.role() = 'authenticated');
create policy "Public read categories" on public.categories for select using (true);
create policy "Public read gift_sets" on public.gift_sets for select using (is_active = true or auth.role() = 'authenticated');
create policy "Public read site_content" on public.site_content for select using (true);
create policy "Public read translations" on public.translations for select using (true);
create policy "Public insert orders" on public.orders for insert with check (true);
create policy "Public insert order_items" on public.order_items for insert with check (true);
create policy "Public insert contact_messages" on public.contact_messages for insert with check (true);

create policy "Admin full access products" on public.products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full access categories" on public.categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin full access gift_sets" on public.gift_sets for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin read orders" on public.orders for select using (auth.role() = 'authenticated');
create policy "Admin update orders" on public.orders for update using (auth.role() = 'authenticated');
create policy "Admin read order_items" on public.order_items for select using (auth.role() = 'authenticated');
create policy "Admin read contact_messages" on public.contact_messages for select using (auth.role() = 'authenticated');
create policy "Admin update contact_messages" on public.contact_messages for update using (auth.role() = 'authenticated');
create policy "Admin update site_content" on public.site_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin update translations" on public.translations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public read navigation_items" on public.navigation_items for select using (is_active = true);
create policy "Admin full access navigation_items" on public.navigation_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into public.navigation_items (label_fr, label_ar, href, sort_order, is_active) values
  ('Home', 'الرئيسية', '/', 1, true),
  ('About Us', 'من نحن', '/heritage', 2, true),
  ('Collection', 'المجموعة', '/#collection', 3, true),
  ('Homme', 'رجال', '/homme', 4, true),
  ('Femme', 'نساء', '/femme', 5, true),
  ('Contact', 'Contact', '/#contact', 6, true)
on conflict do nothing;

insert into storage.buckets (id, name, public) values
  ('products', 'products', true),
  ('sets', 'sets', true),
  ('hero', 'hero', true),
  ('heritage', 'heritage', true),
  ('logo', 'logo', true)
on conflict (id) do nothing;
