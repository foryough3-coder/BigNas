-- three16craft: site settings (WhatsApp numbers, location), editable by the
-- admin at /316nas/settings. Run this fourth, after 001–003.

create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  whatsapp_numbers text[] not null default '{}',
  location text not null default '',
  updated_at timestamptz not null default now()
);

insert into site_settings (id, location) values (1, 'La Paz')
on conflict (id) do nothing;

alter table site_settings enable row level security;

create policy "site settings are publicly readable" on site_settings
  for select using (true);
create policy "admins can update site settings" on site_settings
  for update using (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- Let the admin delete a product that already appears in past orders; the
-- order keeps its own copy of the product name and finish.
alter table order_items drop constraint if exists order_items_product_id_fkey;
alter table order_items add constraint order_items_product_id_fkey
  foreign key (product_id) references products(id) on delete set null;
