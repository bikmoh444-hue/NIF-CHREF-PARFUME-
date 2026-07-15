export type Lang = "fr" | "ar";

export type Category = {
  id: string;
  slug: "homme" | "femme" | string;
  name_fr: string;
  name_ar: string;
  created_at?: string;
};

export type Product = {
  id: string;
  category_id?: string | null;
  category?: Category | null;
  slug: string;
  name_fr: string;
  name_ar: string;
  description_fr?: string | null;
  description_ar?: string | null;
  price: number;
  image_url?: string | null;
  gallery?: string[] | null;
  is_bestseller?: boolean;
  is_active?: boolean;
  stock?: number;
  created_at?: string;
  notes_top?: string | null;
  notes_heart?: string | null;
  notes_base?: string | null;
};

export type GiftSet = {
  id: string;
  slug: string;
  name_fr: string;
  name_ar: string;
  description_fr?: string | null;
  description_ar?: string | null;
  price: number;
  image_url?: string | null;
  included_products?: string[] | null;
  is_active?: boolean;
};

export type OrderStatus = "en_attente" | "confirmee" | "expediee" | "livree" | "annulee";

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  customer_address: string;
  note?: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  created_at?: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id?: string;
  order_id?: string;
  product_id?: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type SiteContent = {
  id?: string;
  key: string;
  value_fr?: string | null;
  value_ar?: string | null;
  value_raw?: string | null;
};

export type Translation = {
  id?: string;
  key: string;
  value_fr: string;
  value_ar: string;
};

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
  kind: "product" | "gift_set";
};
