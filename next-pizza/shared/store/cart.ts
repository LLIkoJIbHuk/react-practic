import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib/get-cart-details";

export type ICartItem = {
  id: number,
  quantity: number,
  name: string,
  imageUrl: string,
  price: number,
  pizzaSize?: number | null,
  type?: number | null, 
  ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
  loading: boolean,
  error: boolean,
  totalAmount: number,
  items: ICartItem[],
  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;
  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  /* Запрос на добавление товара в корзину */
  addCartItem: (values: any) => Promise<void>;
  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  
  removeCartItem: async (id: number) => {},
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
}));