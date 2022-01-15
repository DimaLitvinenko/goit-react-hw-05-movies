import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import style from './MoviesPage.module.css';
import Spinner from '../../components/Loader/Loader';
import convertToSlug from '../../utils/slugify';
import * as api from '../../services/themovieDB-api';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';

export default function MoviesPage() {
   const base_img_url = 'https://image.tmdb.org/t/p/w342/';
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
               id="searchInput"
               name="searchInput"
               type="text"
               autoComplete="off"
               autoFocus
               placeholder=" "
               value={query}
               onChange={handleInputChange}
               pattern="^[0-9a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
               title="Поисковое слово может состоять только из букв, апострофа, тире, цифр и пробелов"
            />
            <label className={style.placeholder} htmlFor="searchInput">
               Search The Movies
            </label>
            <button type="submit" className={style.button}>
               <FcSearch />
            </button>
         </form>

         {status === 'pending' && <Spinner />}
         {status === 'rejected' && <h2>{error.message}</h2>}

         {status === 'resolved' && (
            <ul className={style.list}>
               {movies.map(({ id, title, poster_path, release_date }) => (
                  <li key={id} className={style.item}>
                     <Link
                        className={style.movieLink}
                        to={`/movies/${convertToSlug(`${title} ${id}`)}`}
                        state={{
                           from: { location, label: 'back to Movies' },
                        }}
                     >
                        <img
                           className={style.movieImage}
                           src={`${base_img_url}${poster_path}`}
                           alt={title}
                        />
                     </Link>
                     <h4 className={style.movieTitle}>{title}</h4>
                     <p className={style.movieRelisedTitle}>
                        Relised:
                        <span className={style.movieRelised}> {release_date}</span>
                     </p>
                  </li>
               ))}
            </ul>
         )}
      </section>
   );
}
