import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';
import cartSlice from './cart.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  }
});

//при изменении состояния получаем jwt и записываем JWT_PERSISTENT_STATE
store.subscribe(() => {
  saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;