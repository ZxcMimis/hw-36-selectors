import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, login } from '../redux/auth/authSlice';
import styles from './AuthView.module.scss';

export default function AuthView() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = { 
      name: isRegister ? name : 'User', 
      email, 
      password, 
      avatar: 'https://i.pravatar.cc/150' 
    };

    if (isRegister) {
      dispatch(register(userData));
    } else {
      dispatch(login(userData));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{isRegister ? 'Реєстрація' : 'Вхід'}</h2>
        
        {isRegister && (
          <input 
            type="text" 
            placeholder="Ваше ім'я" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">
          {isRegister ? 'Продовжити' : 'Увійти'}
        </button>

        <p onClick={() => setIsRegister(!isRegister)} className={styles.toggle}>
          {isRegister ? 'Вже є акаунт? Увійти' : 'Немає акаунту? Створити'}
        </p>
      </form>
    </div>
  );
}