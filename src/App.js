import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.module.css';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Container from './components/Container/Container';
import PageHeader from './components/Header/PageHeader';

// import HomePage from './pages/HomePage/HomePage';
// import MoviesPage from './pages/MoviesPage/MoviesPage';
// import MovieDetailPage from './pages/MovieDetailsPage/MovieDetailsPage';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.js'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.js'));
const MovieDetailPage = lazy(() =>
   import('./pages/MovieDetailsPage/MovieDetailsPage/MovieDetailPage.js'),
);

export default function App() {
   return (
      <div className={style.App}>
         <Container>
            <PageHeader />

            <Suspense
               fallback={
                  <div className={style.loadWrapper}>
                     <Loader
                        type="Triangle"
                        color="red"
                        secondaryColor="blue"
                        height={80}
                        width={80}
                     />
                  </div>
               }
            >
               <Routes>
                  <Route path="/" exact element={<HomePage />} />

                  <Route path="/movies" exact component={<MoviesPage />} />

                  {/* <Route path="/movies/:movieId/*" component={<MovieDetailPage />} /> */}
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
