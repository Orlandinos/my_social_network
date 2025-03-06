import { configureStore } from '@reduxjs/toolkit';
import formSlice from '../features/formSlice';
import authReducer from '../features/enterSlice'

const tokenFromLocalStorage = localStorage.getItem('authToken');

export const store = configureStore({
  reducer: {
    form: formSlice,
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      token: tokenFromLocalStorage,
    },
  },
});

export default store;
