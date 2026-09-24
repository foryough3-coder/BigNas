-- three16craft: row level security policies.
-- Run this second, after 001_schema.sql.

alter table categories enable row level security;
alter table products enable row level security;
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Anyone (including signed-out visitors) can read the storefront catalog.
create policy "categories are publicly readable" on categories
  for select using (true);

create policy "products are publicly readable" on products
  for select using (true);

-- Only an admin (a profile with is_admin = true) can change the catalog.
create policy "admins can insert categories" on categories
  for insert with check (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can update categories" on categories
  for update using (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can delete categories" on categories
  for delete using (exists (select 1 from profiles where id = auth.uid() and is_admin));

create policy "admins can insert products" on products
  for insert with check (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can update products" on products
  for update using (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can delete products" on products
  for delete using (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- A signed-in user can only see their own profile row.
create policy "users can read their own profile" on profiles
  for select using (auth.uid() = id);

-- Checkout is anonymous: anyone can submit an order, but only admins can
-- read or manage the list (no customer-facing order lookup yet).
create policy "anyone can submit an order" on orders
  for insert with check (true);
create policy "admins can read orders" on orders
  for select using (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can update orders" on orders
  for update using (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can delete orders" on orders
  for delete using (exists (select 1 from profiles where id = auth.uid() and is_admin));

create policy "anyone can submit order items" on order_items
  for insert with check (true);
create policy "admins can read order items" on order_items
  for select using (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can update order items" on order_items
  for update using (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "admins can delete order items" on order_items
  for delete using (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- After running this file:
-- 1. Create your one admin login in the Supabase dashboard under
--    Authentication > Users > Add user (email + password). Do not use a
--    public sign-up form; this app doesn't have one, by design.
-- 2. Run this once, with the email you used above, to grant admin access:
--      update profiles set is_admin = true where email = 'you@example.com';
