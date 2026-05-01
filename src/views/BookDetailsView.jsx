import { useSelector } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import { booksSelectors } from '../redux/books';
import PageHeading from '../components/PageHeading/PageHeading';
import styles from './BookDetailsView.module.scss'; 

export default function BookDetailsView() {
  const location = useLocation();
  const { slug } = useParams();

  const bookId = slug.match(/[a-z0-9]+$/)[0];

  const entities = useSelector(booksSelectors.getBookEntities);
  const book = entities[bookId];

  const backLinkHref = location.state?.from ?? '/books';

  return (
    <div className={styles.container}>
      <PageHeading text="Деталі книги" />

      {book ? (
        <>
          <Link to={backLinkHref} className={styles.backBtn}>
            {location.state?.label ?? '← Назад'}
          </Link>

          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={book.imgUrl} alt={book.title} />
            </div>
            
            <div className={styles.info}>
              <h2 className={styles.title}>{book.title}</h2>
              <p className={styles.author}>Автор: {book.author?.name || 'Невідомий'}</p>
              <p className={styles.description}>{book.descr}</p>
            </div>
          </div>
        </>
      ) : (
        <h2>Книгу не знайдено або завантаження...</h2>
      )}
    </div>
  );
}