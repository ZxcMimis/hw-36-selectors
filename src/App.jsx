import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar.jsx';
import Container from './components/Container/Container.jsx';

const HomeView = lazy(() =>
  import('./views/HomeView.jsx' /* webpackChunkName: "home-view" */),
);
// const AuthorsView = lazy(() =>
//   import('./views/AuthorsView.jsx' /* webpackChunkName: "authors-view" */),
// );
const BooksView = lazy(() =>
  import('./views/BooksView.jsx' /* webpackChunkName: "books-view" */),
);
const BookDetailsView = lazy(() =>
  import('./views/BookDetailsView.jsx' /* webpackChunkName: "book-view" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.jsx' /* webpackChunkName: "404-view" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>ЗАГРУЖАЄМО МАРШРУТ...</h1>}>
        <Routes>
          <Route path="/" element={<HomeView />} />

          {/* <Route path="/authors" element={<AuthorsView />} /> */}

          <Route path="/books" element={<BooksView />} />

          <Route path="/books/:slug" element={<BookDetailsView />} />

          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Container>
  );
}