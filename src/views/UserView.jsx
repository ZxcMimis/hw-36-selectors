import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import styles from './UserView.module.scss';

export default function UserView() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  if (!user || Object.keys(user).length === 0) {
    return <h2>Завантаження профілю...</h2>;
  }

  return (
    <div className={styles.profileCard}>
      <img src={user.avatar} alt="avatar" className={styles.avatar} />
      
      <h2 className={styles.name}>{user.name || 'Користувач'}</h2>
      <p className={styles.email}>{user.email}</p>
      
      <button onClick={() => dispatch(logout())} className={styles.logoutBtn}>
        Вийти з акаунту
      </button>
    </div>
  );
}