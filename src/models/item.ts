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
  selectedSize: number;
}

export interface Size {
  size: string;
  available: true;
}
