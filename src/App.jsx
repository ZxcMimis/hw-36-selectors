import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar.jsx';
import Container from './components/Container/Container.jsx';

const HomeView = lazy(() => import('./views/HomeView.jsx'));
const BooksView = lazy(() => import('./views/BooksView.jsx'));
const BookDetailsView = lazy(() => import('./views/BookDetailsView.jsx'));
const NotFoundView = lazy(() => import('./views/NotFoundView.jsx'));

export default function App() {

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>ЗАГРУЖАЄМО...</h1>}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="books" element={<BooksView />} />
          <Route path="books/:slug" element={<BookDetailsView />} />
          
          {/* Редирект для GitHub Pages */}
          <Route path="hw-36-selectors" element={<Navigate to="/" replace />} />

          {/* Все остальные пути ведут на 404 */}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Container>
  );
}