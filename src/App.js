import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Container from './components/Container/Container';
import PageHeader from './components/Header/PageHeader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.js'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.js'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.js'));

export default function App() {
   return (
      <div className={style.App}>
         <Container>
            <PageHeader />

            <Suspense fallback={<Loader type="ThreeDots" color="blue" height={80} width={80} />}>
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/movies" element={<MoviesPage />} />
                  <Route path="/movies/:slug/*" element={<MovieDetailPage />} />
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
