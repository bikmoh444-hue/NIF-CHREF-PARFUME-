insert into public.categories (id, slug, name_fr, name_ar) values
  ('00000000-0000-0000-0000-000000000101', 'homme', 'Homme', 'رجال'),
  ('00000000-0000-0000-0000-000000000102', 'femme', 'Femme', 'نساء')
on conflict (slug) do update set name_fr = excluded.name_fr, name_ar = excluded.name_ar;

insert into public.products (category_id, slug, name_fr, name_ar, description_fr, description_ar, price, image_url, is_bestseller, stock, notes_top, notes_heart, notes_base) values
  ('00000000-0000-0000-0000-000000000101', 'invictus', 'Invictus', 'إنفيكتوس', 'Une aura marine, boisée et solaire pensée pour l''homme conquérant.', 'نفحات بحرية وخشبية مضيئة للرجل الواثق.', 350, 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1000&q=80', true, 42, 'Pamplemousse, accord marin', 'Laurier, jasmin', 'Gaïac, ambre gris'),
  ('00000000-0000-0000-0000-000000000101', '212', '212', '٢١٢', 'Un sillage urbain, musqué et épicé.', 'عبير حضري مسكي وحار.', 350, 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80', false, 30, null, null, null),
  ('00000000-0000-0000-0000-000000000101', '1-million', '1 Million', 'ون مليون', 'Cuir doré, cannelle et épices précieuses.', 'جلد ذهبي وقرفة وتوابل ثمينة.', 350, 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80', true, 25, null, null, null),
  ('00000000-0000-0000-0000-000000000101', 'night-blue', 'Night Blue', 'نايت بلو', 'Fraîcheur bleutée, encens discret et fond ambré.', 'انتعاش أزرق وبخور ناعم وقاعدة عنبرية.', 350, 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1000&q=80', false, 21, null, null, null),
  ('00000000-0000-0000-0000-000000000102', 'goddess', 'Goddess', 'غودس', 'Vanille lumineuse, lavande soyeuse et douceur florale.', 'فانيلا مشرقة ولافندر حريري ورقة زهرية.', 350, 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=1000&q=80', true, 36, null, null, null),
  ('00000000-0000-0000-0000-000000000102', 'vanilla-28', 'Vanilla 28', 'فانيلا ٢٨', 'Vanille brune, tonka et musc ambré.', 'فانيلا بنية وتونكا ومسك عنبري.', 350, 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1000&q=80', false, 40, null, null, null),
  ('00000000-0000-0000-0000-000000000102', 'light-blue', 'Light Blue', 'لايت بلو', 'Citron de Sicile, pomme croquante et cèdre blanc.', 'ليمون صقلي وتفاح منعش وأرز أبيض.', 350, 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80', false, 18, null, null, null),
  ('00000000-0000-0000-0000-000000000102', 'kayali', 'Kayali', 'كيالي', 'Rose velours, sucre ambré et bois de santal.', 'ورد مخملي وسكر عنبري وخشب الصندل.', 350, 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=1000&q=80', true, 33, null, null, null)
on conflict (slug) do update set name_fr = excluded.name_fr, name_ar = excluded.name_ar, price = excluded.price, image_url = excluded.image_url;

insert into public.gift_sets (slug, name_fr, name_ar, description_fr, description_ar, price, image_url, included_products) values
  ('le-trio-prestige', 'Le Trio Prestige', 'ثلاثي البرستيج', 'Trois signatures complémentaires pour explorer les facettes nobles de NIF CHRIF.', 'ثلاث بصمات عطرية لاكتشاف أوجه نيف شريف الفاخرة.', 1050, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80', '["Invictus","Goddess","Kayali"]'),
  ('edition-imperiale', 'L''Édition Impériale', 'الإصدار الإمبراطوري', 'Un coffret cérémoniel avec parfums, voile parfumé et carte personnalisée.', 'صندوق احتفالي مع عطور ولمسة معطرة وبطاقة مخصصة.', 1250, 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80', '["1 Million","Vanilla 28"]'),
  ('duo-mystique', 'Le Duo Mystique', 'الثنائي الغامض', 'Deux sillages contrastés, l''un solaire, l''autre nocturne.', 'عبيران متناقضان، أحدهما مشمس والآخر ليلي.', 700, 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=80', '["Night Blue","Light Blue"]')
on conflict (slug) do update set name_fr = excluded.name_fr, name_ar = excluded.name_ar, price = excluded.price;

insert into public.site_content (key, value_fr, value_ar, value_raw) values
  ('delivery_fee', null, null, '35'),
  ('whatsapp_number', null, null, ''),
  ('phone_number', null, null, ''),
  ('instagram_url', null, null, 'https://instagram.com'),
  ('facebook_url', null, null, 'https://facebook.com'),
  ('tiktok_url', null, null, 'https://tiktok.com'),
  ('hero_title', 'NIF CHRIF', 'نيف شريف', null),
  ('hero_subtitle', 'L''ART DE LA PARFUMERIE', 'فن صناعة العطور', null),
  ('heritage_text', 'NIF CHRIF marie l''opulence olfactive marocaine aux gestes précis des ateliers de Grasse.', 'تمزج نيف شريف فخامة العطر المغربي بدقة مشاغل غراس الفرنسية.', null)
on conflict (key) do update set value_fr = excluded.value_fr, value_ar = excluded.value_ar, value_raw = excluded.value_raw;

insert into public.translations (key, value_fr, value_ar) values
  ('hero_primary', 'DÉCOUVRIR LA COLLECTION', 'اكتشف المجموعة'),
  ('hero_secondary', 'SIGNATURE SETS', 'أطقم التوقيع'),
  ('checkout', 'Passer la commande', 'إتمام الطلب')
on conflict (key) do update set value_fr = excluded.value_fr, value_ar = excluded.value_ar;
