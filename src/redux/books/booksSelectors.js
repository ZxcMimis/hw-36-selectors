import { createSelector } from '@reduxjs/toolkit';

const selectBooksState = state => state.books;

export const getBookEntities = createSelector(
  [selectBooksState],
  (books) => books.entities || {}
);

export const getAllBooks = createSelector(
  [getBookEntities],
  (entities) => Object.values(entities)
);

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


export const getBookBySlug = (state, bookSlug) => {
    const books = getAllBooks(state);
    return books.find(book => book.slug === bookSlug);
};

export const getIsLoading = state => state.books.isLoading;
export const getError = state => state.books.error;