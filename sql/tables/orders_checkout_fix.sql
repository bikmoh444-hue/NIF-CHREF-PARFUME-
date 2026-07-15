create extension if not exists "uuid-ossp";

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

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public insert orders" on public.orders;
drop policy if exists "Public insert order_items" on public.order_items;
drop policy if exists "Admin read orders" on public.orders;
drop policy if exists "Admin update orders" on public.orders;
drop policy if exists "Admin read order_items" on public.order_items;

create policy "Public insert orders" on public.orders
  for insert
  with check (true);

create policy "Public insert order_items" on public.order_items
  for insert
  with check (true);

create policy "Admin read orders" on public.orders
  for select
  using (auth.role() = 'authenticated');

create policy "Admin update orders" on public.orders
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin read order_items" on public.order_items
  for select
  using (auth.role() = 'authenticated');
