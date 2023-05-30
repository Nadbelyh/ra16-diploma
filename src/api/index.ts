import { AxiosPromise, CancelTokenSource } from "axios";

import http from "../services/http";
import { Category } from "../models/category";
import { Item } from "../models/item";

export default {
  getTopSales(): AxiosPromise {
    return http.get(`http://localhost:7070/api/top-sales`);
  },
  getCategories(): AxiosPromise<Category[]> {
    return http.get(`http://localhost:7070/api/categories`);
  },
  getItems(): AxiosPromise<Item[]> {
    return http.get(`http://localhost:7070/api/items`);
  },
  getItemsByCategoryId(id: number): AxiosPromise {
    return http.get(`http://localhost:7070/api/items?categoryId=${id}`);
  },
  getItemsByCategoryIdAndOffset(id: number, offset: number): AxiosPromise {
    return http.get(
      `http://localhost:7070/api/items?categoryId=${id}&offset=${offset}`
    );
  },
  getItemById(id: number): AxiosPromise {
    return http.get(`http://localhost:7070/api/items/${id}`);
  },
};
