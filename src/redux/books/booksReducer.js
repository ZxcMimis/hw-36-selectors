import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchBooks } from './booksOperations';

const booksAdapter = createEntityAdapter({
});

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    isLoading: false,
    error: null,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;

        booksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;