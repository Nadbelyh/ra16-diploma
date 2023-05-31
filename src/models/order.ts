export interface Order {
  owner: Owner;
  items: OrderItem[];
}

export interface Owner {
  phone: string;
  address: string;
}

export interface OrderItem {
  id: number;
  price: number;
  count: number;
}
