import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './HomePage.module.css';
import { SiThemoviedatabase } from 'react-icons/si';

import { toast } from 'react-toastify';
import Spinner from '../../components/Loader/Loader';
import * as api from '../../services/themovieDB-api';
import convertToSlug from '../../utils/slugify';

export default function HomePage() {
   const base_img_url = 'https://image.tmdb.org/t/p/w342/';
   const location = useLocation();
   const [trendFilms, setTrendFilms] = useState(null);
   const [error, setError] = useState(null);
   // const [page, setPage] = useState(1);
   // const [totalMovie, setTotalMovie] = useState(0);
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
         unmountedRef.current = true;
      };
   }, [location]);

   return (
      <section>
         <h2 className={style.title}>
            Trending today <SiThemoviedatabase />
         </h2>

         {status === 'pending' && <Spinner />}

         {status === 'rejected' && <h3>{error.message}</h3>}

         {status === 'resolved' && (
            <ul className={style.list}>
               {trendFilms.map(({ id, title, poster_path }) => (
                  <li key={id} className={style.item}>
                     <Link
                        className={style.movieLink}
                        to={`/movies/${convertToSlug(`${title} ${id}`)}`}
                        state={{ from: { location, label: 'back to Home' } }}
                     >
                        <img
                           className={style.movieImage}
                           src={`${base_img_url}${poster_path}`}
                           alt={title}
                        />
                        <h4 className={style.movieTitle}>{title}</h4>
                     </Link>
                  </li>
               ))}
            </ul>
         )}
      </section>
   );
}

// import { useEffect, useState } from "react";
// import Gallery from "../components/Gallery/Gallery";
// import * as apiService from '../services/apiService'

// export default function HomePage() {
//     const [trends, setTrends] = useState(null);

//     useEffect(() => {
//         apiService.getTrends().then(r => {
//             const sortByPopularity = [...r.results].sort((a, b) => a.popularity < b.popularity ? 1 : -1);
//             setTrends(sortByPopularity)
//         })
//     }, [])

//     return (
//         <>
//             <h1 className="tittle"> TOP trends this week</h1>
//             {trends && <Gallery items={trends}/>}
//         </>
//     )
// }
