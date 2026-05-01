import { useSelector } from 'react-redux';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { booksSelectors } from '../redux/books';
import PageHeading from '../components/PageHeading/PageHeading';
import styles from './BookDetailsView.module.scss';

export default function BookDetailsView() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const bookId = slug.match(/[a-z0-9]+$/)?.[0];

  const book = useSelector(state => booksSelectors.getBookById(state, bookId));

  const goBackPath = location.state?.from ?? '/books';

  if (!book && bookId) {
    return <h2 className={styles.error}>Книга не найдена в базе данных</h2>;
  }

  return (
    <main className={styles.detailsContainer}>
      <button 
        onClick={() => navigate(goBackPath)} 
        className={styles.backBtn}
      >
        ← Вернуться назад
      </button>

      {book && (
        <section className={styles.layout}>
          <div className={styles.poster}>
            <img src={book.imgUrl} alt={book.title} />
          </div>

          <div className={styles.content}>
            <PageHeading text={book.title} />
            <div className={styles.infoGroup}>
              <p><strong>Автор:</strong> {book.author?.name || 'Неизвестен'}</p>
              <p><strong>Жанр:</strong> {book.genre}</p>
            </div>
            
            <article className={styles.description}>
              <h4>Описание</h4>
              <p>{book.descr}</p>
            </article>

            <button className={styles.buyBtn}>Читать онлайн</button>
          </div>
        </section>
      )}
    </main>
  );
}