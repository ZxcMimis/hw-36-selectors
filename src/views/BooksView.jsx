import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import slugify from 'slugify';
import { useSelector, useDispatch } from 'react-redux';
import { booksOperations, booksSelectors } from '../redux/books';
import PageHeading from '../components/PageHeading/PageHeading';
import styles from './BooksView.module.scss'; 

const makeSlug = string => slugify(string, { lower: true });

export default function BooksView() {
  const location = useLocation();
  const dispatch = useDispatch();
  const books = useSelector(booksSelectors.getBooks);
  const [searchParams, setSearchParams] = useSearchParams();
  const bookQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    dispatch(booksOperations.fetchBooks());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchParams(query !== '' ? { query } : {});
  };

  const visibleBooks = books.filter(book =>
    book.title.toLowerCase().includes(bookQuery.toLowerCase())
  );

  return (
    <>
      <PageHeading text="Книги" />

      <div className={styles.searchContainer}>
        <input
          type="text"
          value={bookQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
          placeholder="Знайти книгу за назвою..."
        />
      </div>

      {visibleBooks.length > 0 ? (
        <ul className={styles.bookList}>
          {visibleBooks.map(book => (
            <li key={book.id} className={styles.bookCard}>
              <Link
                to={`${makeSlug(`${book.title} ${book.id}`)}`}
                state={{
                  from: location,
                  label: 'Назад до пошуку',
                }}
                className={styles.bookLink}
              >
                <div className={styles.thumb}>
                  <img src={book.imgUrl} alt={book.title} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{book.title}</h3>
                  <p className={styles.genre}>{book.genre}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noResults}>
          На жаль, за запитом <b>«{bookQuery}»</b> нічого не знайдено 😢
        </p>
      )}
    </>
  );
}