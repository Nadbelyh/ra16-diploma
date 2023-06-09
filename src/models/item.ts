export interface Item {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
  sku: number;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  sizes: Size[];
  isSelected?: boolean;
  count: number;
  selectedSize: string;
}

export interface Size {
  size: string;
  available: true;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  count: number;
  size: string;
}
