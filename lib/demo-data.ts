import type { Category, GiftSet, Product, SiteContent, Translation } from "@/types";

export const demoCategories: Category[] = [
  { id: "00000000-0000-0000-0000-000000000101", slug: "homme", name_fr: "Homme", name_ar: "رجال" },
  { id: "00000000-0000-0000-0000-000000000102", slug: "femme", name_fr: "Femme", name_ar: "نساء" }
];

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

export const demoProducts: Product[] = [
  {
    id: "p-invictus",
    category_id: "00000000-0000-0000-0000-000000000101",
    slug: "invictus",
    name_fr: "Invictus",
    name_ar: "إنفيكتوس",
    description_fr: "Une aura marine, boisée et solaire pensée pour l'homme conquérant.",
    description_ar: "نفحات بحرية وخشبية مضيئة للرجل الواثق.",
    price: 350,
    image_url: image("photo-1595425970377-c9703cf48b6d"),
    is_bestseller: true,
    stock: 42,
    notes_top: "Pamplemousse, accord marin",
    notes_heart: "Laurier, jasmin",
    notes_base: "Gaïac, ambre gris"
  },
  {
    id: "p-212",
    category_id: "00000000-0000-0000-0000-000000000101",
    slug: "212",
    name_fr: "212",
    name_ar: "٢١٢",
    description_fr: "Un sillage urbain, musqué et épicé, taillé pour les nuits de Casablanca.",
    description_ar: "عبير حضري مسكي وحار لليالي الدار البيضاء.",
    price: 350,
    image_url: image("photo-1592945403244-b3fbafd7f539"),
    is_bestseller: false,
    stock: 30
  },
  {
    id: "p-1-million",
    category_id: "00000000-0000-0000-0000-000000000101",
    slug: "1-million",
    name_fr: "1 Million",
    name_ar: "ون مليون",
    description_fr: "Cuir doré, cannelle et épices précieuses dans une composition opulente.",
    description_ar: "جلد ذهبي وقرفة وتوابل ثمينة بتركيبة فاخرة.",
    price: 350,
    image_url: image("photo-1615634260167-c8cdede054de"),
    is_bestseller: true,
    stock: 25
  },
  {
    id: "p-night-blue",
    category_id: "00000000-0000-0000-0000-000000000101",
    slug: "night-blue",
    name_fr: "Night Blue",
    name_ar: "نايت بلو",
    description_fr: "Fraîcheur bleutée, encens discret et fond ambré pour une élégance nocturne.",
    description_ar: "انتعاش أزرق وبخور ناعم وقاعدة عنبرية لأناقة ليلية.",
    price: 350,
    image_url: image("photo-1600612253971-422e7f7faeb6"),
    is_bestseller: false,
    stock: 21
  },
  {
    id: "p-goddess",
    category_id: "00000000-0000-0000-0000-000000000102",
    slug: "goddess",
    name_fr: "Goddess",
    name_ar: "غودس",
    description_fr: "Vanille lumineuse, lavande soyeuse et douceur florale pour une féminité royale.",
    description_ar: "فانيلا مشرقة ولافندر حريري ورقة زهرية لأنوثة ملكية.",
    price: 350,
    image_url: image("photo-1547887538-e3a2f32cb1cc"),
    is_bestseller: true,
    stock: 36
  },
  {
    id: "p-vanilla-28",
    category_id: "00000000-0000-0000-0000-000000000102",
    slug: "vanilla-28",
    name_fr: "Vanilla 28",
    name_ar: "فانيلا ٢٨",
    description_fr: "Vanille brune, tonka et musc ambré dans un voile gourmand et noble.",
    description_ar: "فانيلا بنية وتونكا ومسك عنبري بلمسة شهية وراقية.",
    price: 350,
    image_url: image("photo-1590736704728-f4730bb30770"),
    is_bestseller: false,
    stock: 40
  },
  {
    id: "p-light-blue",
    category_id: "00000000-0000-0000-0000-000000000102",
    slug: "light-blue",
    name_fr: "Light Blue",
    name_ar: "لايت بلو",
    description_fr: "Citron de Sicile, pomme croquante et cèdre blanc pour une fraîcheur solaire.",
    description_ar: "ليمون صقلي وتفاح منعش وأرز أبيض لانتعاش مشمس.",
    price: 350,
    image_url: image("photo-1594035910387-fea47794261f"),
    is_bestseller: false,
    stock: 18
  },
  {
    id: "p-kayali",
    category_id: "00000000-0000-0000-0000-000000000102",
    slug: "kayali",
    name_fr: "Kayali",
    name_ar: "كيالي",
    description_fr: "Rose velours, sucre ambré et bois de santal, un parfum de cérémonie.",
    description_ar: "ورد مخملي وسكر عنبري وخشب الصندل لعطر احتفالي.",
    price: 350,
    image_url: image("photo-1619994403073-2cec844b8e63"),
    is_bestseller: true,
    stock: 33
  }
];

export const demoGiftSets: GiftSet[] = [
  {
    id: "g-trio-prestige",
    slug: "le-trio-prestige",
    name_fr: "Le Trio Prestige",
    name_ar: "ثلاثي البرستيج",
    description_fr: "Trois signatures complémentaires pour explorer les facettes nobles de NIF CHRIF.",
    description_ar: "ثلاث بصمات عطرية لاكتشاف أوجه نيف شريف الفاخرة.",
    price: 1050,
    image_url: image("photo-1608571423902-eed4a5ad8108"),
    included_products: ["Invictus", "Goddess", "Kayali"]
  },
  {
    id: "g-imperiale",
    slug: "edition-imperiale",
    name_fr: "L'Édition Impériale",
    name_ar: "الإصدار الإمبراطوري",
    description_fr: "Un coffret cérémoniel avec parfums, voile parfumé et carte personnalisée.",
    description_ar: "صندوق احتفالي مع عطور ولمسة معطرة وبطاقة مخصصة.",
    price: 1250,
    image_url: image("photo-1541643600914-78b084683601"),
    included_products: ["1 Million", "Vanilla 28"]
  },
  {
    id: "g-duo-mystique",
    slug: "duo-mystique",
    name_fr: "Le Duo Mystique",
    name_ar: "الثنائي الغامض",
    description_fr: "Deux sillages contrastés, l'un solaire, l'autre nocturne.",
    description_ar: "عبيران متناقضان، أحدهما مشمس والآخر ليلي.",
    price: 700,
    image_url: image("photo-1616949755610-8c9bbc08f138"),
    included_products: ["Night Blue", "Light Blue"]
  }
];

export const demoContent: SiteContent[] = [
  { key: "delivery_fee", value_raw: "35" },
  { key: "whatsapp_number", value_raw: "" },
  { key: "phone_number", value_raw: "" },
  { key: "instagram_url", value_raw: "https://instagram.com" },
  { key: "facebook_url", value_raw: "https://facebook.com" },
  { key: "tiktok_url", value_raw: "https://tiktok.com" },
  { key: "hero_title", value_fr: "NIF CHRIF", value_ar: "نيف شريف" },
  { key: "hero_subtitle", value_fr: "L'ART DE LA PARFUMERIE", value_ar: "فن صناعة العطور" },
  { key: "heritage_text", value_fr: "NIF CHRIF marie l'opulence olfactive marocaine aux gestes précis des ateliers de Grasse. Chaque parfum évoque le hammam, l'ombre des arcades, les dunes chaudes et la noblesse d'une peau parfumée.", value_ar: "تمزج نيف شريف فخامة العطر المغربي بدقة مشاغل غراس الفرنسية. كل عطر يستحضر الحمام، ظلال الأقواس، دفء الصحراء ونبل البشرة المعطرة." }
];

export const demoTranslations: Translation[] = [
  { key: "hero_primary", value_fr: "DÉCOUVRIR LA COLLECTION", value_ar: "اكتشف المجموعة" },
  { key: "hero_secondary", value_fr: "SIGNATURE SETS", value_ar: "أطقم التوقيع" }
];
