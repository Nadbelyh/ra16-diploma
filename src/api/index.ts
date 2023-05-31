import { AxiosPromise } from "axios";

import http from "../services/http";
import { Category } from "../models/category";
import { Item } from "../models/item";
import { Order } from "../models/order";

export default {
  getTopSales(): AxiosPromise {
    return http.get(`http://localhost:7070/api/top-sales`);
  },
  getCategories(): AxiosPromise<Category[]> {
    return http.get(`http://localhost:7070/api/categories`);
  },
  getItems(param: string): AxiosPromise<Item[]> {
    return http.get(`http://localhost:7070/api/items?${param}`);
  },
  getItemById(id: number): AxiosPromise {
    return http.get(`http://localhost:7070/api/items/${id}`);
  },
  order(order: Order): AxiosPromise {
    const data = order === null || order === undefined ? {} : order;
    return http.post("http://localhost:7070/api/order", data);
  },
};
