import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { fetchBooks } from './booksOperations';

const entities = createReducer([], (builder) => {
  builder.addCase(fetchBooks.fulfilled, (_, action) => action.payload);
});

const isLoading = createReducer(false, (builder) => {
  builder
    .addCase(fetchBooks.pending, () => true)
    .addCase(fetchBooks.fulfilled, () => false)
    .addCase(fetchBooks.rejected, () => false);
});

const error = createReducer(null, (builder) => {
  builder
    .addCase(fetchBooks.rejected, (_, action) => action.payload)
    .addCase(fetchBooks.pending, () => null);
});

export default combineReducers({
  entities,
  isLoading,
  error,
});


// import { createSlice } from '@reduxjs/toolkit';
// const booksSlice = createSlice({
//   name: 'books',
//   initialState: { entities: [], isLoading: false, error: null },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBooks.fulfilled, (state, { payload }) => {
//         state.entities = payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchBooks.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchBooks.rejected, (state, { payload }) => {
//         state.isLoading = false;
//         state.error = payload;
//       });
//   },
// });
// export default booksSlice.reducer;