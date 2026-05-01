import { createSelector } from '@reduxjs/toolkit';
import { createEntityAdapter } from '@reduxjs/toolkit';
const booksAdapter = createEntityAdapter();

const selectBooksState = state => state.books;

export const {
  selectAll: getAllBooks, 
  selectEntities: getBookEntities, 
  selectById: getBookById, 
} = booksAdapter.getSelectors(selectBooksState);

export const getVisibleBooks = createSelector(
  [getAllBooks, (state) => state.books.filter],
  (books, filter) => {
    if (!filter) return books;
    const normalizedFilter = filter.toLowerCase();
    
    return books.filter(book => 
      book.title.toLowerCase().includes(normalizedFilter)
    );
  }
);


export const getBookBySlug = createSelector(
  [getAllBooks, (state, slug) => slug],
  (books, slug) => {
    const id = slug.match(/[a-z0-9]+$/)?.[0];
    return books.find(book => book.id === id || book.slug === slug);
  }
);

// 5. Простые селекторы статусов
export const getIsLoading = state => state.books.isLoading;
export const getError = state => state.books.error;