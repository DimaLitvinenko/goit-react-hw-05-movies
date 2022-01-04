import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './HomePage.module.css';
import { SiThemoviedatabase } from 'react-icons/si';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as api from '../../services/themovieDB-api';
import convertToSlug from '../../utils/slugify';

export default function HomePage() {
   const location = useLocation();
   const [trendFilms, setTrendFilms] = useState(null);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');
   const unmountedRef = useRef();

   useEffect(() => {
      if (!unmountedRef.current) {
         setStatus('pending');
         getFilmsTrending();
      }
      async function getFilmsTrending() {
         try {
            const response = await api.fetchTrending();
            if (response.ok) {
               const data = await response.json();
               setTrendFilms(data.results);
               setStatus('resolved');
            } else {
               return Promise.reject(new Error('The tranding not detected!'));
            }
         } catch (error) {
            setError(error);
            setStatus('rejected');
            toast.error();
         }
      }

      return () => {
         unmountedRef.current = true;
      };
   }, [location]);

   return (
      <section>
         <h2 className={style.title}>
            Trending today <SiThemoviedatabase />
         </h2>

         {status === 'pending' && <Loader type="ThreeDots" color="blue" height={80} width={80} />}

         {status === 'rejected' && <h3>{error.message}</h3>}

         {status === 'resolved' && (
            <ul className={style.list}>
               {trendFilms.map(({ id, title }) => (
                  <li key={id} className={style.item}>
                     <Link
                        to={`/movies/${convertToSlug(`${title} ${id}`)}`}
                        state={{ from: { location, label: 'go back to home' } }}
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
