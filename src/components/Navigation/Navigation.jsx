import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

export default function Navigation() {
  const getClassName = ({ isActive }) => 
    isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

  return (
    <nav>
      <NavLink
        to="/"
        className={getClassName}
      >
        Главная
      </NavLink>

      {/* <NavLink
        to="/authors"
        className={getClassName}
      >
        Авторы
      </NavLink> */}

      <NavLink
        to="/books"
        className={getClassName}
      >
        Книги
      </NavLink>
    </nav>
  );
}