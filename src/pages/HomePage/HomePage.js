import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SiThemoviedatabase } from 'react-icons/si';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as api from '../../services/themovieDB-api';
import style from './HomePage.module.css';

export default function HomePage() {
   const [trendsFilms, setTrendsFilms] = useState(null);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');

   useEffect(() => {
      setStatus('pending');
      getFilmsTrending();
   }, []);
   async function getFilmsTrending() {
      try {
         const response = await api.fetchTrending();
         if (response.ok) {
            const data = await response.json();
            setTrendsFilms(data.results);
            setStatus('resolved');
         } else {
            return Promise.reject(new Error('Not found'));
         }
      } catch (error) {
         setError(error);
         setStatus('rejected');
         toast.error(error.message);
      }
   }

   return (
      <section>
         <h2 className={style.title}>
            Trending today <SiThemoviedatabase />
         </h2>

         {status === 'pending' && (
            <Loader type="Triangle" color="red" secondaryColor="blue" height={80} width={80} />
         )}

         {status === 'resolved' && (
            <ul className={style.list}>
               {trendsFilms.map(({ id, title }) => (
                  <li key={id} className={style.item}>
                     <NavLink
                        to={
                           // {
                           // pathname:
                           `/movies/${id}`
                           // ,
                           // state: { from: location, label: 'Back to Home Page' },
                           // }
                        }
                     >
                        {title}
                     </NavLink>
                  </li>
               ))}
            </ul>
         )}
      </section>
   );
}
