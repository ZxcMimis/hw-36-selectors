import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from './components/AppBar/AppBar.jsx';
import Container from './components/Container/Container.jsx';

const HomeView = lazy(() => import('./views/HomeView.jsx'));
const BooksView = lazy(() => import('./views/BooksView.jsx'));
const BookDetailsView = lazy(() => import('./views/BookDetailsView.jsx'));
const NotFoundView = lazy(() => import('./views/NotFoundView.jsx'));
const AuthView = lazy(() => import('./views/AuthView.jsx'));
const UserView = lazy(() => import('./views/UserView.jsx'));

export default function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>ЗАГРУЖАЄМО...</h1>}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="books" element={<BooksView />} />
          <Route path="books/:slug" element={<BookDetailsView />} />
          
          <Route path="hw-36-selectors" element={<Navigate to="/" replace />} />

          <Route 
            path="/auth" 
            element={!isLoggedIn ? <AuthView /> : <Navigate to="/profile" replace />} 
          />
          
          <Route 
            path="/profile" 
            element={isLoggedIn ? <UserView /> : <Navigate to="/auth" replace />} 
          />

          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Container>
  );
}