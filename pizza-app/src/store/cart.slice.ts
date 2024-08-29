import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: { 
    //Удаляет товар из корзины по его идентификатору
    //Используем метод filter, чтобы создать новый массив, исключая товар с идентификатором, указанным в action.payload
    delete: (state, action: PayloadAction<number>) =>{
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    //Используем find, чтобы получить только один элемент, который соответствует условию. 
    remove: (state, action: PayloadAction<number>) => {
      const existed = state.items.find( i => i.id === action.payload);
      //Если товар с нужным id не найден - завершить выполнение
      if (!existed) {
        return;
      }
      //Если количество товара равно 1, то он удаляется из корзины
      if (existed.count === 1){
        state.items = state.items.filter(i => i.id !== action.payload);
      } else {
        state.items.map(i => {
          //Если кол-во больше 1, то уменьшается на 1
          if (i.id === action.payload) {
            i.count -= 1;
          }
          return i;
        });
        return;
      }
    },
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find( i => i.id === action.payload);
      //добавляем, если не существует, иначе - увеличиваем на 1
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map(i => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i;
      });
    }
  }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;