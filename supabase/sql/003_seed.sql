-- three16craft: seed data, copied verbatim from src/data/catalog.json so the
-- database starts identical to what the site shows today (all placeholder
-- fields stay NULL until confirmed by the owner).
-- Run this third, after 001_schema.sql and 002_policies.sql.

insert into categories (id, name, icon, sort_order) values
  ('glass-spigots', 'Glass spigots', 'spigot', 0),
  ('handrail-fittings', 'Handrail fittings', 'handrail', 1),
  ('glass-clamps', 'Glass clamps', 'clamp', 2),
  ('door-hardware', 'Door hardware', 'door-handle', 3),
  ('finials', 'Finials', 'finial', 4),
  ('mounting-accessories', 'Mounting accessories', 'flange', 5)
on conflict (id) do nothing;

insert into products (
  id, category_id, position, name, finish_label, price, currency, price_status,
  description, alt, thumbnail_key, image_key, source_image,
  sku, dimensions, material_grade, stock, included_items, data_status
) values
  ('square-base-glass-spigot', 'glass-spigots', 0, 'Square-base glass spigot', 'Polished silver', null, null, 'not-provided',
   'Rectangular glass spigot with a square base and two visible front fasteners.',
   'Square-base glass spigot on a white background',
   'three16craft/products/v1/square-base-glass-spigot-480.webp',
   'three16craft/products/v1/square-base-glass-spigot-1000.webp',
   'product-shots/01-square-base-glass-spigot.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('round-base-glass-spigot', 'glass-spigots', 1, 'Round-base glass spigot', 'Polished silver', null, null, 'not-provided',
   'Round glass spigot with a slotted body and a circular base.',
   'Round-base glass spigot on a white background',
   'three16craft/products/v1/round-base-glass-spigot-480.webp',
   'three16craft/products/v1/round-base-glass-spigot-1000.webp',
   'product-shots/04-round-base-glass-spigot.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('black-glass-spigot', 'glass-spigots', 2, 'Black glass spigot', 'Matte black', null, null, 'not-provided',
   'Black glass spigot shown beside a separate square cover.',
   'Black glass spigot on a white background',
   'three16craft/products/v1/black-glass-spigot-480.webp',
   'three16craft/products/v1/black-glass-spigot-1000.webp',
   'product-shot-white-background.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('rounded-glass-clamp', 'glass-clamps', 3, 'Rounded glass clamp', 'Satin silver', null, null, 'not-provided',
   'Rounded clamp with two metal faces and dark inner pads.',
   'Rounded glass clamp on a white background',
   'three16craft/products/v1/rounded-glass-clamp-480.webp',
   'three16craft/products/v1/rounded-glass-clamp-1000.webp',
   'product-shots/06-rounded-glass-clamp.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('ball-finials', 'finials', 4, 'Ball finials', 'Gold / silver', null, null, 'not-provided',
   'Ball finials photographed in gold and silver finishes.',
   'Ball finials on a white background',
   'three16craft/products/v1/ball-finials-480.webp',
   'three16craft/products/v1/ball-finials-1000.webp',
   'product-shots/07-gold-and-silver-finials.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('long-door-handle-set', 'door-hardware', 5, 'Long door handle set', 'Polished silver', null, null, 'not-provided',
   'Long paired door handles photographed with keys and fitting accessories.',
   'Long door handle set on a white background',
   'three16craft/products/v1/long-door-handle-set-480.webp',
   'three16craft/products/v1/long-door-handle-set-1000.webp',
   'product-shots/12-long-door-handle-set.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('curved-handrail-bracket', 'handrail-fittings', 6, 'Curved handrail bracket', 'Polished silver', null, null, 'not-provided',
   'Curved support bracket with a round base and an adjustable upper plate.',
   'Curved handrail bracket on a white background',
   'three16craft/products/v1/curved-handrail-bracket-480.webp',
   'three16craft/products/v1/curved-handrail-bracket-1000.webp',
   'product-shots/05-curved-handrail-bracket.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('adjustable-support-bracket', 'handrail-fittings', 7, 'Adjustable support bracket', 'Polished silver', null, null, 'not-provided',
   'Upright support bracket with a round base and a pivoting upper plate.',
   'Adjustable support bracket on a white background',
   'three16craft/products/v1/adjustable-support-bracket-480.webp',
   'three16craft/products/v1/adjustable-support-bracket-1000.webp',
   'product-shots/09-adjustable-support-bracket.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('chrome-elbow-fitting', 'handrail-fittings', 8, 'Elbow fitting', 'Polished silver', null, null, 'not-provided',
   'Right-angle metal elbow fitting with two socket ends.',
   'Elbow fitting on a white background',
   'three16craft/products/v1/chrome-elbow-fitting-480.webp',
   'three16craft/products/v1/chrome-elbow-fitting-1000.webp',
   'product-shots/02-chrome-elbow-fitting.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('roller-hardware-set', 'door-hardware', 9, 'Roller hardware set', 'Silver / black', null, null, 'not-provided',
   'Two metal hardware bars with circular rollers and a central black knob.',
   'Roller hardware set on a white background',
   'three16craft/products/v1/roller-hardware-set-480.webp',
   'three16craft/products/v1/roller-hardware-set-1000.webp',
   'product-shots/03-roller-hardware-set.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('cylindrical-slotted-fitting', 'mounting-accessories', 10, 'Slotted cylindrical fitting', 'Silver', null, null, 'not-provided',
   'Short cylindrical fitting with a side opening and contrasting end collars.',
   'Slotted cylindrical fitting on a white background',
   'three16craft/products/v1/cylindrical-slotted-fitting-480.webp',
   'three16craft/products/v1/cylindrical-slotted-fitting-1000.webp',
   'product-shots/08-cylindrical-slotted-fitting.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('round-cover-flange', 'mounting-accessories', 11, 'Round cover flange', 'Polished silver', null, null, 'not-provided',
   'Round metal cover with a large central opening.',
   'Round cover flange on a white background',
   'three16craft/products/v1/round-cover-flange-480.webp',
   'three16craft/products/v1/round-cover-flange-1000.webp',
   'product-shots/10-round-cover-flange.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation'),

  ('cylindrical-glass-standoff', 'mounting-accessories', 12, 'Cylindrical glass standoff', 'Polished silver', null, null, 'not-provided',
   'Cylindrical fitting with a raised cap, visible gaskets and a side fixing hole.',
   'Cylindrical glass standoff on a white background',
   'three16craft/products/v1/cylindrical-glass-standoff-480.webp',
   'three16craft/products/v1/cylindrical-glass-standoff-1000.webp',
   'product-shots/11-cylindrical-glass-standoff.png',
   null, null, null, null, null, 'draft-needs-owner-confirmation')
on conflict (id) do nothing;
