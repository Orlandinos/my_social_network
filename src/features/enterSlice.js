// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token;
      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', token);
    },
    clearToken: (state) => {
      state.token = null;
      // Очищаем токен из localStorage
      localStorage.removeItem('authToken');
    },
  },
});


export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

