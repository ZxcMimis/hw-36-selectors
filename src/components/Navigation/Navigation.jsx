import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

export default function Navigation() {
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
    </nav>
  );
}