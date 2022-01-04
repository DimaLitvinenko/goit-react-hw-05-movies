import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import style from './MoviesPage.module.css';
import convertToSlug from '../../utils/slugify';
import * as api from '../../services/themovieDB-api';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { FcSearch } from 'react-icons/fc';

export default function MoviesPage() {
   const location = useLocation();
   const [searchParams, setSearchParams] = useSearchParams();
   const searchQuery = searchParams.get('query');
   const [query, setQuery] = useState('');
   const [movies, setMovies] = useState(null);
   const [error, setError] = useState('null');
   const [status, setStatus] = useState('idle');
   const unmountedRef = useRef();

   useEffect(() => {
      if (
         (searchQuery && !unmountedRef.current) ||
         (searchQuery && unmountedRef.current)
      ) {
         setStatus('pending');
         getMovieByQuery();
      }

      async function getMovieByQuery() {
         try {
            const response = await api.fetchMovieByQuery(searchQuery);
            if (response.ok) {
               const data = await response.json();
               setMovies(data.results);
               setStatus('resolved');
            } else {
               return Promise.reject(
                  new Error(`The movie ${searchQuery} - not detected!`),
               );
            }
         } catch (error) {
            setError(error);
            setStatus('rejected');
            toast.error(`${error.message}`, {
               position: 'top-left',
               autoClose: 4000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
      }

      return () => {
         unmountedRef.current = !unmountedRef.current;
      };
   }, [searchQuery]);

   function handleFormSubmit(event) {
      event.preventDefault();
      if (query.trim() !== '') {
         setSearchParams({ query });
         setQuery('');
      } else {
         toast.error('The entry field must be filled in!', {
            position: 'top-left',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   }

   function handleInputChange({ currentTarget }) {
      const inputValue = currentTarget.value;
      setQuery(inputValue.toLowerCase());
   }

   return (
      <section>
         <form onSubmit={handleFormSubmit} className={style.form}>
            <input
               className={style.input}
               id="input"
               type="text"
               autoComplete="off"
               autoFocus
               placeholder=" "
               value={query}
               onChange={handleInputChange}
            />
            <label className={style.placeholder} htmlFor="input">
               Search The Movies
            </label>
            <button type="submit" className={style.button}>
               <FcSearch />
            </button>
         </form>

         {status === 'pending' && (
            <Loader type="ThreeDots" color="blue" height={80} width={80} />
         )}
         {status === 'rejected' && <h2>{error.message}</h2>}

         {status === 'resolved' && (
            <ul className={style.list}>
               {movies.map(({ id, title }) => (
                  <li key={id} className={style.item}>
                     <Link
                        className={style.movieLink}
                        to={`/movies/${convertToSlug(`${title} ${id}`)}`}
                        state={{
                           from: { location, label: 'back to Movies' },
                        }}
                     >
                        {title}
                     </Link>
                  </li>
               ))}
            </ul>
         )}
      </section>
   );
}
