import { createSelector } from '@reduxjs/toolkit';

const selectBooksState = state => state.books;

export const getBooks = createSelector(
  selectBooksState,
  (state) => {
    return Object.values(state.entities);
  }
);

export const getIsLoading = state => state.books.isLoading;
export const getError = state => state.books.error;