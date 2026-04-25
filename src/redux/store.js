import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'; 
import booksReducer from './books/booksReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});