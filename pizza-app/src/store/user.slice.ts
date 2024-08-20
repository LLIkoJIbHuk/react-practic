import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import { LoginResonse } from '../interfaces/auth.interface';
import axios from 'axios';
import { PREFIX } from '../helpers/API';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginState: null | 'rejected';
}

//при загрузке загружаем из localStorage, если нет - ставим null
const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  loginState: null
};

export const login = createAsyncThunk('user/login', 
  async (params: {email: string, password: string}) => {
    const {data} = await axios.post<LoginResonse>(`${PREFIX}/auth/login`, {
      email: params.email,
      password: params.password
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    logout: (state) => {
      state.jwt = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResonse>) => {
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      action.error.message
    });
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;