import { db } from '../database'; 


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAuthors() {
  await delay(500); 
  return db.authors.map(author => ({
    ...author,
    books: db.books.filter(book => book.authorId === author.id)
  }));
}

export async function fetchBooks() {
  await delay(500);
  return db.books;
}

export async function fetchBookById(bookId) {
  await delay(500);
  const book = db.books.find(b => b.id === Number(bookId));
  
  if (!book) {
    throw new Error('Книга не найдена');
  }

  const author = db.authors.find(a => a.id === book.authorId);
  return { ...book, author };
}