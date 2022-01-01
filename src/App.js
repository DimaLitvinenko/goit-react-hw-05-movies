import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import Container from './components/Container/Container';
import PageHeader from './components/Header/PageHeader';

// import HomePage from './pages/HomePage/HomePage';
// import MoviesPage from './pages/MoviesPage/MoviesPage';
// import MovieDetailPage from './pages/MovieDetailsPage/MovieDetailsPage';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));

export default function App() {
   return (
      <div className={style.App}>
         <Container>
            <PageHeader />

            <Suspense
               fallback={
                  <Loader
                     type="Triangle"
                     color="red"
                     secondaryColor="blue"
                     height={80}
                     width={80}
                  />
               }
            >
               <Routes>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/movies" element={<MoviesPage />} />

                  <Route path="/movies/:slug/*" element={<MovieDetailsPage />} />
               </Routes>
            </Suspense>
         </Container>

         <ToastContainer
            position="top-left"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </div>
   );
}
