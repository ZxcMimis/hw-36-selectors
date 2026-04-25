import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

export default function Navigation() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const getClassName = ({ isActive }) => 
    isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={getClassName}>
        Головна
      </NavLink>

      <NavLink to="/books" className={getClassName}>
        Книги
      </NavLink>

      {isLoggedIn ? (
        <NavLink to="/profile" className={getClassName}>
          Мій кабінет
        </NavLink>
      ) : (
        <NavLink to="/auth" className={getClassName}>
          Увійти
        </NavLink>
      )}
    </nav>
  );
}