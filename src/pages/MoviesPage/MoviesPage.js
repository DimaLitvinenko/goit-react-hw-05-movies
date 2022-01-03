import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import style from './MoviesPage.module.css';
import convertToSlug from '../../utils/slugify';
import * as api from '../../services/themovieDB-api';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { TiArrowBackOutline } from 'react-icons/ti';
import { FcSearch } from 'react-icons/fc';

export default function MoviesPage() {
   const location = useLocation();
   const [searchParams, setSearchParams] = useSearchParams();
   const searchQuery = searchParams.get('query');
   const [query, setQuery] = useState('');
   const [movies, setMovies] = useState(null);
   const [error, setError] = useState('null');
   const [status, setStatus] = useState('idle');

   useEffect(() => {
      async function getMovieByQuery() {
         try {
            const response = await api.fetchMovieByQuery(searchQuery);
            if (response.ok) {
               const data = await response.json();
               setMovies(data.results);
               setStatus('resolved');
            } else {
               return Promise.reject(new Error(`Movie ${searchQuery} - not detected!`));
            }
         } catch (error) {
            setError(error);
            setStatus('rejected');
            toast.error(error.message);
         }
      }
      if (searchQuery) {
         setStatus('pending');
         getMovieByQuery();
      }
   }, [searchQuery]);

   function handleFormSubmit(event) {
      event.preventDefault();

      if (query.trim() !== '') {
         setSearchParams({ query });
         setQuery('');
      } else {
         toast.error('The Entry field must be filled in!');
      }
   }

   function handleInputChange(event) {
      const inputValue = event.currentTarget.value;
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
            <Loader type="Triangle" color="red" secondaryColor="blue" height={80} width={80} />
         )}
         {status === 'rejected' && <h3>{error.message}</h3>}

         {status === 'resolved' && (
            <ul className={style.list}>
               {movies.map(({ id, title }) => (
                  <li key={id}>
                     <Link
                        to={`/movies/${convertToSlug(`${title} ${id}`)}`}
                        state={{
                           from: { location, label: `${(<TiArrowBackOutline />)} Back to Movies` },
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
