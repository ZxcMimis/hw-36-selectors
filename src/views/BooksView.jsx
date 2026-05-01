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
  
  const books = useSelector(booksSelectors.getAllBooks);
  const isLoading = useSelector(booksSelectors.getIsLoading);

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
    <div className={styles.wrapper}>
      <PageHeading text="Библиотека" />

      <div className={styles.searchBar}>
        <input
          type="text"
          value={bookQuery}
          onChange={handleSearchChange}
          placeholder="Поиск по названию..."
          className={styles.input}
        />
      </div>

      {isLoading && <h2 className={styles.loader}>Загрузка...</h2>}

      {!isLoading && (
        <ul className={styles.grid}>
          {visibleBooks.map(({ id, title, imgUrl, genre }) => (
            <li key={id} className={styles.card}>
              <Link
                to={`/books/${makeSlug(`${title} ${id}`)}`}
                state={{ from: location }} // Сохраняем место, откуда пришли
                className={styles.link}
              >
                <div className={styles.imageContainer}>
                  <img src={imgUrl} alt={title} />
                </div>
                <div className={styles.meta}>
                  <h3 className={styles.bookTitle}>{title}</h3>
                  <span className={styles.tag}>{genre}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && visibleBooks.length === 0 && (
        <p className={styles.empty}>Ничего не найдено по запросу "{bookQuery}"</p>
      )}
    </div>
  );
}