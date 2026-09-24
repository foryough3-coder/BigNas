-- three16craft: core schema (categories, products, profiles, orders, order_items)
-- Run this first in the Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists categories (
  id text primary key,
  name text not null,
  icon text not null,
  sort_order int not null default 0
);

create table if not exists products (
  id text primary key,
  category_id text references categories(id),
  position int not null default 0,
  name text not null,
  finish_label text not null,
  price numeric,
  currency text,
  price_status text not null default 'not-provided',
  description text not null,
  alt text not null,
  thumbnail_key text not null,
  image_key text not null,
  source_image text,
  sku text,
  dimensions jsonb,
  material_grade text,
  stock int,
  included_items text[],
  data_status text not null default 'draft-needs-owner-confirmation',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One row per Supabase Auth user. Created automatically on signup by the
-- trigger below. is_admin starts false; flip it manually for the owner
-- account after creating it in Authentication > Users (see 002_policies.sql
-- comments and the README).
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending_quote',
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  customer_address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text references products(id),
  product_name text not null,
  finish_label text,
  quantity int not null check (quantity > 0 and quantity <= 999),
  price numeric
);
